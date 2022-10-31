# realestate-nft-marketplace

Trabajo de graduación UVG titulado "Traspaso inmediato e inteligente de propiedades usando blockchain y NFTs".

Autores:
- [Andy Castillo](https://github.com/Andy5am)
- [Marco Fuentes](https://github.com/marcofuentes05)
- [Gian Luca Rivera](https://github.com/LucaBia)
- [Francisco Rosal](https://github.com/FR98)


# Ruby Setup

- Install rvm
- rvm install 2.7.2
- bundle install
- Troubleshoot:
  - MacOS: brew install libpq
  - Ubuntu: sudo apt-get -y install libpq-dev
- EDITOR="nano" rails credentials:edit --environment development
```
db:
    port: 5432
    username: postgres
    password: ""
    database: nft_realestate_dev

aws:
    access_key_id: ""
    secret_access_key: ""
    region: ""
    bucket: ""

hmac:
    secret: somehmacsecret

secret_key_base: somesecretkeybase
```
- rake dev:db:reset
- Guardar password


# Conventional Commits
- feat
- fix
- docs
- test
- ci
- test
- refactor
- build

# Rubocop
- rubocop --autocorrect --only Style/StringLiterals && rubocop --autocorrect --only Style/WordArray
- bundle exec rubocop --parallel
