import Docker from 'dockerode';
import {DROGON_IMAGE} from '../constants';
import {panic} from '../helpers';

export const dockerInit = () => {
  return new Docker(); //defaults to above if env variables are not used
};

export const pullImage = async (image: string) => {
  const docker = dockerInit();
  await docker
    .pull(image)
    .then(stream => {
      docker.modem.followProgress(stream, onFinished, onProgress);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function onFinished(err: any, output: any) {}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function onProgress(event: any) {
        // let status = event.status
        // let progress = event.progress
        // if(progress)
        //     process.stdout.write(`[docker]: ${progress}` + '\r')
      }
    })
    .catch(err => {
      panic(`Failed to pull the ${image}. ${err}`);
    });
};

export const runAContainerInBackground = async (
  image: string,
  cmd: [],
  hostConfig: {}
) => {
  const docker = dockerInit();

  const container = await docker.createContainer({
    Image: image,
    Cmd: cmd,
    HostConfig: hostConfig,
  });

  await container.start({});
  return container;
};

export const mountAndRunCommand = (
  projectPath: string,
  args: any,
  command: string,
  cb: any
) => {
  const docker = dockerInit();

  if (args) command = `${command} ${args.join(' ')}`;

  docker.createContainer(
    {
      Image: DROGON_IMAGE,
      HostConfig: {
        AutoRemove: true,
        Binds: [`${projectPath}:/goloop/app`],
      },
      Tty: false,
    },
    (err, container: any) => {
      if (err) panic(err);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      container.start((err: any, stream: any) => {
        container.exec(
          {
            Cmd: ['sh', '-c', command],
            AttachStderr: true,
            AttachStdout: true,
            WorkingDir: '/goloop/app',
          },
          (err: any, exec: any) => {
            exec.start({Tty: false, Detach: false}, (err: any, stream: any) => {
              docker.modem.demuxStream(stream, process.stdout, process.stderr);
            });

            const id = setInterval(() => {
              exec.inspect({}, (err: any, status: any) => {
                if (status.Running === false) {
                  clearInterval(id);
                  container.stop({}, () => {
                    cb(status.ExitCode);
                  });
                }
              });
            }, 100);
          }
        );
      });
    }
  );
};
