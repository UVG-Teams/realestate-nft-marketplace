### Modifications needed to run updated version of this web server

Change `venv/lib/python3.10/site-packages/jwt/api_jws.py : 5`,  to: 
```python
    from collections.abc import Mapping
```