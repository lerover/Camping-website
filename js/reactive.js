export function reactive(obj) {
    const subscribers = new Map();
  
    const notify = (key, newVal, oldVal) => {
      if (subscribers.has(key)) {
        subscribers.get(key).forEach(fn => fn(newVal, oldVal));
      }
    };
  
    const deepProxy = (target) => {
      return new Proxy(target, {
        get(t, k, r) {
          const val = Reflect.get(t, k, r);
          if (typeof val === 'object' && val !== null) {
            return deepProxy(val);
          }
          return val;
        },
        set(t, k, v, r) {
          const oldVal = t[k];
          const result = Reflect.set(t, k, v, r);
          notify(k, v, oldVal);
          return result;
        }
      });
    };
  
    return {
      state: deepProxy(obj),
      watch(key, fn) {
        if (!subscribers.has(key)) {
          subscribers.set(key, []);
        }
        subscribers.get(key).push(fn);
      }
    };
  }
  