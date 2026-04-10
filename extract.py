import os, re

file_path = 'formulario-estilo-menu.html'

with open(file_path, 'r', encoding='utf-8') as f:
    c = f.read()

css = re.search(r'(?s)<style>(.*?)</style>', c)
if css:
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css.group(1).strip() + '\n')

js = re.search(r'(?s)<script>(.*?)</script>', c)
if js:
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(js.group(1).strip() + '\n')

c = re.sub(r'(?s)<style>.*?</style>', '<link rel="stylesheet" href="styles.css">', c)
c = re.sub(r'(?s)<script>.*?</script>', '<script src="script.js"></script>', c)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Files separated successfully.")
