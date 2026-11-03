#!/bin/zsh
PY=/Library/Frameworks/Python.framework/Versions/3.13/bin/python3
cd "${0:A:h}"
for n in "$@"; do echo $n; done | xargs -P 5 -I{} $PY tabaka.py uret {} --ref referans.png
