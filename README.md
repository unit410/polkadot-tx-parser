## Polkadot Tx Parser

The Polkadot Tx Parser is a tool to help determine the contents of a Polkadot "Call". This was specifically designed to be useful with the Polkadot multisig system.

Extrinsics and the call data contained within can be extremely long in Polkadot. In order to avoid including an arbitrarily large amount of data on-chain, Polkadot only stores the hash of the data. While this solves the chain bloat issue, it makes the approval process of multisignature transactions difficult - how can an approver approve a transaction if they can only view the hash?

This tool is intended to be an independent audit on what that call data contains. A typical flow would be:
* Initiator creates a multisignature extrinsic & sends the call data to the approvers
* Approvers enter the call data into the `Polkadot Tx Parser` to confirm its contents
* Once independently confirmed, the approvers can either approve or reject the operation

### Local Use

In addition to a deployed web app, you can also use the CLI that ships with this repository.

```
yarn parse \
  --endpoint <ENDPOINT> \
  --aliasesFile <file>
  --tx <TX> \
```

### Development

Install dependencies:

```shell
make install
```

Build a release with:

```shell
make build
```

Start a development server:

```shell
make dev
```

Lint:

```shell
make lint
```

### Future Improvements

* Alias File: Add a UI element to allow a user to enter a JSON mapping of adress to alias
* Custom Endpoint: Add a UI element to allow a user to enter a custom node enpoint

### License

[Blue Oak Model License 1.0.0](https://blueoakcouncil.org/license/1.0.0)

### No Liability

As far as the law allows, this software comes as is, without any warranty or condition, and no contributor will be liable to anyone for any damages related to this software or this license, under any kind of legal claim.