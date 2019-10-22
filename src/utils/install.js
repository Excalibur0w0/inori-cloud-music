export const installComponent = (component, name) => {
    return {
        install(Vue) {
            let componentClass = Vue.extend(component)
            let instance = new componentClass()
            document.body.appendChild(instance.$mount().$el)
            Vue.prototype[name] = model => {
                instance.model = model
            }
        }
    }
}

export const installInstance = (instanceFunction, name) => {
    return {
        install(Vue) {
            Vue.prototype[name] = instanceFunction
        }
    }
}