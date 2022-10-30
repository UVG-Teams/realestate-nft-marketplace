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
- EDITOR="nano" rails credentials:edit --environment development
```
db:
    database: nft_realestate_dev
    username: postgres
    password: ""
    port: 5432

hmac:
    secret: "some secret string"
```
- rake dev:db:reset
- Guardar password
