import re, json, os, glob, zlib
# Path to apps/v4 in a clone of github.com/shadcn-ui/ui.
UP=os.environ.get('SHADCN_UI_V4', os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..','ui','apps','v4'))
KIT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=f'{KIT}/src/examples/ui'
os.makedirs(OUT,exist_ok=True)
for f in glob.glob(f'{OUT}/*.tsx'): os.remove(f)
ICON=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'icon_harvest.json')))
ICON.update({
 'CircleCheckIcon':'CheckmarkCircle02Icon','TerminalIcon':'ComputerTerminal01Icon','ArrowUpIcon':'ArrowUp02Icon','RotateCwIcon':'RotateClockwiseIcon',
 'LoaderCircleIcon':'Loading03Icon','GlobeIcon':'Globe02Icon','PlusIcon':'PlusSignIcon','MessageCircleDashedIcon':'BubbleChatIcon','TelescopeIcon':'Telescope01Icon',
 'PaperclipIcon':'Attachment01Icon','FileCodeIcon':'SourceCodeIcon','CircleIcon':'CircleIcon','FileTextIcon':'File02Icon','CircleAlertIcon':'AlertCircleIcon',
 'XIcon':'Cancel01Icon','ImageIcon':'Image01Icon','ChevronDownIcon':'ArrowDown01Icon','CheckIcon':'Tick02Icon','ArrowUpRightIcon':'ArrowUpRight01Icon',
 'CopyIcon':'Copy01Icon','ThumbsUpIcon':'ThumbsUpIcon','ThumbsDownIcon':'ThumbsDownIcon','ChevronRightIcon':'ArrowRight01Icon','FolderIcon':'Folder01Icon','FileIcon':'File01Icon',
 'ArrowUpDown':'ArrowUpDownIcon','AudioWaveform':'AudioWave01Icon','Bell':'Notification01Icon','Bold':'TextBoldIcon','BookOpenCheck':'BookOpen01Icon','Bot':'RoboticIcon',
 'Calculator':'Calculator01Icon','Calendar':'Calendar03Icon','CalendarPlusIcon':'CalendarAdd01Icon','ChevronDown':'ArrowDown01Icon','ChevronRight':'ArrowRight01Icon',
 'ChevronsUpDown':'UnfoldMoreIcon','CircleFadingArrowUpIcon':'CircleArrowUp01Icon','CircleFadingPlusIcon':'AddCircleIcon','Command':'CommandIcon','CreditCard':'CreditCardIcon',
 'DotIcon':'RecordIcon','FilePenIcon':'FileEditIcon','FilePlusIcon':'FileAddIcon','Folder':'Folder01Icon','Forward':'Forward01Icon','Frame':'CropIcon',
 'GalleryVerticalEnd':'LayoutBottomIcon','GitCommitHorizontalIcon':'GitCommitIcon','Italic':'TextItalicIcon','ListFilterIcon':'FilterHorizontalIcon','LogOut':'Logout01Icon',
 'MailCheckIcon':'MailValidation01Icon','Map':'MapsIcon','Minus':'MinusSignIcon','MoreHorizontal':'MoreHorizontalIcon','PieChart':'PieChartIcon','Plus':'PlusSignIcon',
 'RotateCcwIcon':'RotateLeft01Icon','Search':'Search01Icon','Settings':'Settings01Icon','Settings2':'Settings02Icon','ShieldAlertIcon':'SecurityWarningIcon','Smile':'SmileIcon',
 'Sparkles':'SparklesIcon','SquareTerminal':'ComputerTerminal01Icon','TagIcon':'Tag01Icon','Trash2':'Delete02Icon','Underline':'TextUnderlineIcon','User':'UserIcon',
 # tabler
 'IconBell':'Notification01Icon','IconBrandJavascript':'JavaScriptIcon','IconCheck':'Tick02Icon','IconCloud':'CloudIcon','IconCopy':'Copy01Icon','IconCornerDownLeft':'ArrowTurnBackwardIcon',
 'IconFolderCode':'FolderCodeIcon','IconGitBranch':'GitBranchIcon','IconInfoCircle':'InformationCircleIcon','IconPlus':'PlusSignIcon','IconRefresh':'RefreshIcon','IconStar':'StarIcon',
 'IconTrendingUp':'ArrowUpRight01Icon','IconTrendingDown':'ArrowDownRight01Icon','IconArrowUpRight':'ArrowUpRight01Icon',
})
VALID=set(json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'huge_names.json'))))
unmapped={}
def transform(src,name=''):
    src=re.sub(r'^"use client"\n\n','',src)
    src=re.sub(r'@/styles/(radix|base)-[\w-]+/ui/','@/components/ui/',src)
    src=src.replace('@/registry/new-york-v4/ui/','@/components/ui/')
    src=re.sub(r'@/registry/bases/(base|radix)/hooks/','@/hooks/',src)
    src=src.replace('"@/registry/icons/__lucide__"','"lucide-react"')
    # next
    if 'next/link' in src:
        src=re.sub(r'import Link from "next/link"\n','',src); src=re.sub(r'<Link\b','<a',src).replace('</Link>','</a>')
    if 'next/image' in src:
        src=re.sub(r'import Image from "next/image"\n','',src); src=re.sub(r'<Image\b','<img',src)
        src=re.sub(r'\n\s*(fill|priority)\n','\n',src); src=re.sub(r'\s(fill|priority)(?=[\s/>])','',src)
    # remote images
    src=re.sub(r'https://images\.unsplash\.com/[^"`\s)]*','placeholder.svg',src)
    src=re.sub(r'https://(?:github\.com|avatar\.vercel\.sh)/([\w.-]+?)(?:\.png)?(?=["`\s)?])[^"`\s)]*', lambda k:f'avatar-{zlib.crc32(k.group(1).encode())%4+1}.svg',src)
    bad=False
    imports=re.findall(r'import \{([^}]*)\} from "(lucide-react|@tabler/icons-react)"\n',src)
    if imports:
        pairs=[]  # (local, source)
        for body,_ in imports:
            for n in body.split(','):
                n=n.strip()
                if not n: continue
                if n.startswith('type '): continue
                if ' as ' in n: s,l=[x.strip() for x in n.split(' as ')]
                else: s=l=n
                pairs.append((l,s))
        src=re.sub(r'import \{[^}]*\} from "(lucide-react|@tabler/icons-react)"\n','',src)
        src=re.sub(r'\bLucideIcon\b','React.ComponentType<{ className?: string }>',src)
        used=set(); wrappers=[]
        for l,s in pairs:
            h=ICON.get(s) or ICON.get(s+'Icon') or (s if s in VALID else None) or (s+'Icon' if s+'Icon' in VALID else None)
            if not h or h not in VALID:
                unmapped[s]=unmapped.get(s,0)+1; bad=True; continue
            n0=len(src)
            src,c=re.subn(r'<'+l+r'\b((?:[^<>]|=>)*?)\s*/>', lambda k:'<HugeiconsIcon icon={'+h+'} strokeWidth={2}'+k.group(1).rstrip()+' />', src)
            if c: used.add(h)
            if re.search(r'[:=({,\[?]\s*'+l+r'(?=\s*[,})\]\n;:])',re.sub(r'icon=\{\w+\}','',src)):
                wrappers.append((l,h))
        imp=''
        names=sorted(used)
        specs=[f'  {x},\n' for x in names]+[f'  {h} as {l}Glyph,\n' for l,h in wrappers]
        if specs: imp='import {\n'+''.join(specs)+'} from "@hugeicons/core-free-icons"\nimport { HugeiconsIcon } from "@hugeicons/react"\n'
        w=''.join(f'\nfunction {l}(props: {{ className?: string }}) {{\n  return <HugeiconsIcon icon={{{l}Glyph}} strokeWidth={{2}} {{...props}} />\n}}\n' for l,h in wrappers)
        # insert after last import statement
        idx=[m.end() for m in re.finditer(r'^import [^\n]*?(?:\n(?:  [^\n]*\n)*\}[^\n]*)?\n',src,re.M)]
        # robust: find end of import block by scanning
        lines=src.split('\n'); end=0; i=0
        while i<len(lines):
            L=lines[i]
            if L.startswith('import '):
                while not re.search(r'from "[^"]+"\s*$|^import "[^"]+"\s*$',lines[i]): i+=1
                end=i+1
            elif L.strip()=='' or L.startswith('//'): pass
            else: break
            i+=1
        lines[end:end]=(imp.rstrip('\n').split('\n') if imp else [])+(w.rstrip('\n').split('\n') if w else [])
        src='\n'.join(lines)
    if 'React.' in src and not re.search(r'import \* as React from "react"|import React',src): src='import * as React from "react"\n'+src
    if 'React.' not in src: src=src.replace('import * as React from "react"\n','')
    src=src.replace('text-muted-foreground/70','text-muted-foreground')
    return src,bad
def clean(t):
    t=re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',t)
    return re.sub(r'\s+',' ',t.replace('`','')).strip()
SKIP_H={'RTL','API Reference','Installation','Changelog'}
skipped=[]
PATCH={
 'button-group-nested':[('import { Input } from "@/components/ui/input"\n','')],
 'calendar-booked-dates':[('import { es } from "react-day-picker/locale"\n','')],
 'item-group':[('  ItemSeparator,\n',''),('(person, index) =>','(person) =>')],
 'message-scroller-opening-position':[('import { Button } from "@/components/ui/button"\n','')],
 'spinner-custom':[('React.ComponentProps<"svg">','Omit<React.ComponentProps<"svg">, "strokeWidth">')],
}
SKIP={'data-table-demo':'needs TanStack Table v9'}
def copy_example(name):
    if name in SKIP: skipped.append((name,SKIP[name])); return None
    p=f'{UP}/examples/radix/{name}.tsx'
    if not os.path.exists(p): skipped.append((name,'missing')); return None
    raw=open(p).read()
    if name.endswith('-rtl') or 'language-selector' in raw or 'next/font' in raw or 'react-day-picker/persian' in raw:
        skipped.append((name,'rtl or locale font')); return None
    src,bad=transform(raw,name)
    for a,b in PATCH.get(name,[]):
        assert a in src,(name,a); src=src.replace(a,b)
    if bad: skipped.append((name,'unmapped icon')); return None
    exs=re.findall(r'export (?:default )?function ([A-Z]\w*)',src)
    if not exs: skipped.append((name,'no export')); return None
    want=''.join(w.capitalize() for w in name.split('-')).lower()
    pick=next((e for e in exs if e.lower()==want),exs[-1])
    open(f'{OUT}/{name}.tsx','w').write(src)
    return pick
out={}
for path in sorted(glob.glob(f'{UP}/content/docs/components/radix/*.mdx')):
    slug=os.path.basename(path)[:-4]
    body=open(path).read().split('---',2)[2]
    heading='Default'; lead=[]; items=[]; seen=set()
    # tokenise: headings, previews, text
    for m in re.finditer(r'^(#{2,3}) ([^\n]+)$|<ComponentPreview(.*?)/>|^([A-Z][^\n<{|#]*(?:\n(?![\n#<`|-])[^\n]*)*)',body,re.M|re.S):
        if m.group(2): heading=m.group(2).strip(); lead=[]
        elif m.group(3) is not None:
            a=m.group(3); n=re.search(r'name="([^"]+)"',a)
            if not n or 'type="block"' in a or 'type="file"' in a:
                if n: skipped.append((n.group(1),'full-page block'))
                continue
            n=n.group(1)
            if heading in SKIP_H or n in seen: continue
            seen.add(n)
            x=copy_example(n)
            if x: items.append({'name':n,'title':heading,'export':x,'lead':lead[0] if lead and heading!='Default' else ''})
            lead=[]
        elif m.group(4): lead.append(clean(m.group(4)))
    if items: out[slug]=items
for h in ('use-media-query.tsx','use-copy-to-clipboard.ts'):
    open(f'{KIT}/src/hooks/{h}','w').write('/* eslint-disable -- copied from shadcn/ui */\n'+open(f'{UP}/hooks/{h}').read().replace('"use client"\n\n',''))
ts='// Generated by tools/gen_ui.py from shadcn/ui docs. Do not edit by hand.\nexport type UiExample = { name: string; title: string; export: string; lead: string }\n\nexport const uiExamples: Record<string, UiExample[]> = '+json.dumps(out,indent=2,ensure_ascii=False)+'\n'
open(f'{KIT}/src/ui-examples.ts','w').write(ts)
print('components',len(out),'examples',sum(len(v) for v in out.values()))
print('unmapped',unmapped)
from collections import Counter
print(Counter(r for _,r in skipped)); print([n for n,r in skipped if r not in('rtl or locale font',)])
