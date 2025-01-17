# Drogon

## Overview

Drogon is a robust, lightweight application development framework used for developing, testing, and deploying smart contracts on the ICON blockchain. The core features of the Drogon makes ICON smart contract developers’ life easy by providing support for multiple contract compilations, tests, and deploying on a public and private network.

## Installation

### Requirements

- Docker
- yarn

```sh
git clone https://github.com/icon-community/drogon -b dev-0.1.0
cd drogon/
yarn install
yarn drogon install
```

## Usage

### drogon init

```sh
yarn drogon  init
```

### drogon compile

```sh
yarn drogon compile --help
yarn drogon compile -p /path/to/drogon/project
yarn drogon compile -p /path/to/drogon/project <gradle flags here>
```

### Features

Drogon offers:

- end-to-end build cycle support for development, testing, and deploying smart contracts
- support for testing Unit and integration tests
- Scriptable deployment framework
- Deployment management for deploying to public and private networks
- Interactive console to directly communicate with public and private networks
- Clear documentation for developers

### Why Drogon?

- Lack of smart contract testing setup
- Lack of easy to use ICON smart contract life cycle management
- Lack of development framework that focuses on ICON smart contract developers

### Goals

- Development framework that focuses on ICON blockchain
- Support for smart contract life cycle management
- Support for unit and integration tests for smart contracts
- Support for REPL interface to interact with public and private networks
- Documentation

## Milestones

### M01

- Create Drogon framework that supports compilation and testing
- Support deploying contracts to a private network using the Drogon framework
- Support deploying contracts to public networks using the Drogon framework

### M02

- Documentation
- Testing Drogon
- Release Drogon v1.0.0

### M03

- Support and Ongoing maintenance of Drogon
- Includes bug fixes and on-going updates

## TODO

- [ ] configurable memory options for Gradle. JVM Memory options
- [ ] port github actions to Docker hub
- [ ] Adding new contract to an existing Drogon project
- [ ] Adding new Unit/Int Test an existing Drogon project
- [ ] Implement test, deploy commands

## Contact

- [Chai](https://twitter.com/ant4g0nist)
- [r3dsm0k3](https://twitter.com/r3dsm0k3)
- [FOMOmental](https://twitter.com/FOMOmental)
