type EventHandler = (...args: any) => void;
const eventBus = {
  dispatch(event: string, data: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  on(event: string, callback: EventHandler) {
    document.addEventListener(event, (e: any) => callback(e.detail));
  },
  remove(event: string, callback: EventHandler) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
