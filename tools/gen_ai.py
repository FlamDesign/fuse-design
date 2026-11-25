import re, json, os, sys
# Path to apps/v4 in a clone of github.com/shadcn-ui/ui.
UP=os.environ.get('SHADCN_UI_V4', os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','ui','apps','v4'))
KIT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=f'{KIT}/src/examples/ai'
os.makedirs(OUT,exist_ok=True)
ICON={
 'CircleCheckIcon':'CheckmarkCircle02Icon','TerminalIcon':'ComputerTerminal01Icon','ArrowUpIcon':'ArrowUp02Icon',
 'RotateCwIcon':'RotateClockwiseIcon','LoaderCircleIcon':'Loading03Icon','GlobeIcon':'Globe02Icon','PlusIcon':'PlusSignIcon',
 'MessageCircleDashedIcon':'BubbleChatIcon','TelescopeIcon':'Telescope01Icon','PaperclipIcon':'Attachment01Icon',
 'FileCodeIcon':'SourceCodeIcon','CircleIcon':'CircleIcon','FileTextIcon':'File02Icon','CircleAlertIcon':'AlertCircleIcon',
 'XIcon':'Cancel01Icon','ImageIcon':'Image01Icon','ChevronDownIcon':'ArrowDown01Icon','CheckIcon':'Tick02Icon',
 'ArrowUpRightIcon':'ArrowUpRight01Icon','FlaskConicalIcon':'TestTube01Icon','CopyIcon':'Copy01Icon','ThumbsUpIcon':'ThumbsUpIcon',
 'ThumbsDownIcon':'ThumbsDownIcon','RouteIcon':'Route01Icon','RefreshCcwIcon':'RefreshIcon','ListTodoIcon':'TaskDaily01Icon',
 'ListChecksIcon':'CheckListIcon','LayersIcon':'Layers01Icon','CircleDotIcon':'RecordIcon','CircleDashedIcon':'DashedLineCircleIcon',
 'ChevronRightIcon':'ArrowRight01Icon','PencilIcon':'PencilEdit02Icon','FolderIcon':'Folder01Icon','FileIcon':'File01Icon',
 'DownloadIcon':'Download01Icon','CircleXIcon':'CancelCircleIcon','BrainIcon':'BrainIcon',
}
unmapped=set()
def transform(src):
    src=re.sub(r'^"use client"\n\n','',src)
    src=re.sub(r'@/styles/(radix|base)-\w+/ui/','@/components/ui/',src)
    src=src.replace('@/registry/bases/base/hooks/','@/hooks/').replace('@/registry/bases/radix/hooks/','@/hooks/')
    m=re.search(r'import \{([^}]*)\} from "lucide-react"\n',src)
    if m:
        names=[n.strip() for n in m.group(1).split(',') if n.strip()]
        mapped=[]
        for n in names:
            if n not in ICON: unmapped.add(n); continue
            h=ICON[n]; mapped.append(h)
            src=re.sub(r'<'+n+r'\b((?:[^<>]|=>)*?)\s*/>', lambda k:'<HugeiconsIcon icon={'+h+'} strokeWidth={2}'+k.group(1).rstrip()+' />', src)
        mapped=sorted(set(mapped))
        imp='import {\n'+''.join(f'  {x},\n' for x in mapped)+'} from "@hugeicons/core-free-icons"\nimport { HugeiconsIcon } from "@hugeicons/react"\n'
        src=src.replace(m.group(0),imp)
        # leftover bare references
        for n in names:
            h=ICON.get(n)
            if h and h!=n and re.search(r'\b'+n+r'\b',src): print('  bare ref',n)
    src=re.sub(r'<(\w+Trigger)\s+render=\{\s*<(\w+)((?:[^<>]|=>)*?)\s*/>\s*\}\s*>(.*?)</\1>', lambda k:'<'+k.group(1)+' asChild><'+k.group(2)+k.group(3)+'>'+k.group(4)+'</'+k.group(2)+'></'+k.group(1)+'>', src, flags=re.S)
    if 'React.' not in src: src=src.replace('import * as React from "react"\n','')
    return src
def clean(t):
    t=re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',t)
    return re.sub(r'\s+',' ',t.replace('`','')).strip()
def paras(block):
    out=[]
    for p in re.split(r'\n\s*\n',block):
        p=p.strip()
        if not p or p.startswith(('<','```','|','-','#','import ','export ','}','{')): continue
        out.append(clean(p))
    return out
def fences(block,langs=('tsx','ts','css','html')):
    return [c.strip('\n') for l,c in re.findall(r'```(\w+)[^\n]*\n(.*?)```',block,re.S) if l in langs]
copied={}
def copy_example(name):
    if name in copied: return copied[name]
    for d in ('radix','base'):
        p=f'{UP}/examples/{d}/{name}.tsx'
        if os.path.exists(p): break
    else:
        print('missing',name); return None
    src=open(p).read()
    print(name)
    src=transform(src)
    src=src.replace('text-muted-foreground/70','text-muted-foreground')
    src=src.replace('          type="file"\n','          type="file"\n          aria-label="Attach files"\n')
    src=re.sub(r'\n\s*aria-label=\{`Effort: \$\{currentEffort\.name\}`\}','',src)
    if name.startswith('scroll-fade'):
        src=re.sub(r'<div className="([^"]*overflow-[xy]-auto[^"]*)">',r'<div tabIndex={0} className="\1">',src)
    ex=re.search(r'export (?:default )?function (\w+)',src)
    open(f'{OUT}/{name}.tsx','w').write(src)
    copied[name]=ex.group(1)
    return ex.group(1)
def page(path,group,slug):
    raw=open(path).read()
    fm,body=raw.split('---',2)[1:]
    title=re.search(r'^title: (.*)$',fm,re.M).group(1).strip()
    desc=re.search(r'^description: (.*)$',fm,re.M).group(1).strip()
    parts=re.split(r'^## (.+)$',body,flags=re.M)
    head=parts[0]; secs=list(zip(parts[1::2],parts[2::2]))
    prev=lambda b:[n for n in re.findall(r'<ComponentPreview[^>]*?name="([^"]+)"',b,re.S)]
    e={'group':group,'slug':slug,'title':title,'description':desc,'intro':paras(re.sub(r'<ComponentPreview.*?/>','',head,flags=re.S))[:2],
       'install':None,'usage':None,'sdk':None,'examples':[]}
    for n in prev(head):
        x=copy_example(n)
        if x: e['examples'].append({'name':n,'title':title,'export':x,'lead':''})
    for h,b in secs:
        h=h.strip()
        if h=='Installation':
            m=re.search(r'```bash\n(.*?)```',b,re.S)
            if m: e['install']=m.group(1).strip()
        elif h=='Usage':
            f=fences(b)
            if f: e['usage']='\n\n'.join(f)
            for n in prev(b):
                x=copy_example(n)
                if x: e['examples'].append({'name':n,'title':'Usage','export':x,'lead':''})
        elif h=='AI SDK':
            f=fences(b); p=paras(b)
            e['sdk']={'text':p[0] if p else '','code':'\n\n'.join(f)}
        elif h in('RTL','API Reference','Fallback','Reduced Motion') or h.startswith('Migrating'):
            continue
        else:
            names=prev(b); p=paras(b); f=fences(b)
            if names:
                for n in names:
                    x=copy_example(n)
                    if x: e['examples'].append({'name':n,'title':h,'export':x,'lead':p[0] if p else ''})
            elif group!='helpers' and (p or f):
                e.setdefault('notes',[]).append({'title':h,'text':p[0] if p else '','code':'\n\n'.join(f)})
    return e
entries=[]
meta=json.load(open(f'{UP}/content/docs/ai-elements/radix/meta.json'))['pages']
for s in meta: entries.append(page(f'{UP}/content/docs/ai-elements/radix/{s}.mdx','elements',s))
for s in ('scroll-fade','shimmer'): entries.append(page(f'{UP}/content/docs/utils/{s}.mdx','utilities',s))
for s in ('ai-sdk','tanstack-ai'): entries.append(page(f'{UP}/content/docs/helpers/{s}.mdx','helpers',s))
for e in entries:
    if e['slug']=='tanstack-ai': e['examples']=[]
# shared modules
for rel,dst in (('components/markdown.tsx','src/components/markdown.tsx'),('components/message-animated.tsx','src/components/message-animated.tsx'),('lib/message-animations.ts','src/lib/message-animations.ts'),('lib/ai.ts','src/lib/ai.ts')):
    open(f'{KIT}/{dst}','w').write(transform(open(f'{UP}/{rel}').read()).replace('  node,\n  className,','  node: _node,\n  className,').replace('  // Streamdown marks fenced','  void _node\n  // Streamdown marks fenced').replace('cn-markdown w-full','cn-markdown typeset typeset-chat w-full'))
os.path.exists(f'{OUT}/tanstack-ai-helper-demo.tsx') and os.remove(f'{OUT}/tanstack-ai-helper-demo.tsx')
ts='// Generated by tools/gen_ai.py from shadcn/ui docs. Do not edit by hand.\nexport type AiEntry = {\n  group: "elements" | "utilities" | "helpers"\n  slug: string\n  title: string\n  description: string\n  intro: string[]\n  install: string | null\n  usage: string | null\n  sdk: { text: string; code: string } | null\n  notes?: { title: string; text: string; code: string }[]\n  examples: { name: string; title: string; export: string; lead: string }[]\n}\n\nexport const aiRegistry: AiEntry[] = '+json.dumps(entries,indent=2,ensure_ascii=False)+'\n'
open(f'{KIT}/src/ai-registry.ts','w').write(ts)
print('unmapped',unmapped); print(len(entries),'entries',sum(len(e['examples']) for e in entries),'examples')
