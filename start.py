#!/usr/bin/env python
import livereload

server = livereload.Server()
server.watch(".")
server.serve()
