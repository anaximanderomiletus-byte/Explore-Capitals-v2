import os
import glob

pages_dir = 'pages'
files = glob.glob(os.path.join(pages_dir, '*.tsx'))

target_class = 'text-white/70 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed'
replacement_class = 'text-white/70 text-[10px] mb-6 font-bold uppercase tracking-[0.2em] leading-relaxed h-8 sm:h-auto flex items-center justify-center'

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if target_class in content:
        new_content = content.replace(target_class, replacement_class)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file}")
