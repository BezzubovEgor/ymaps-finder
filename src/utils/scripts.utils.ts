
export function loadScript(src: string) {
    const jsScript = document.createElement('script')
    jsScript.src = src;
    document.body.appendChild(jsScript)
    return new Promise((resolve) => jsScript.addEventListener('load', resolve));
}
