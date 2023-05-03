# Module Contracts

In CWScript, native blockchain modules are exposed as **module contracts**, meaning you interact with them as if they were simply smart contracts. 

:::note
You cannot `instantiate` module contracts, only call `exec` and `query` on them.
:::

## Wasm

```cwscript
exec! Wasm.#execute()
```

```cwscript
exec! Wasm.#instantiate()
```

```cwscript
exec! Wasm.#migrate()
```

# Bank

```cwscript
exec! Bank.#send()
```

```cwscript
query! Bank.#balance(Address)
```
