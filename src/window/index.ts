export function loadScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    if (!url) {
      return reject();
    }

    const node = document.querySelector(`[data-url="${url}"]`);
    if (node) {
      return resolve();
    }

    const script: HTMLScriptElement = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      script.dataset.url = url;
      resolve();
    };
    script.onerror = reject;
  });
}
