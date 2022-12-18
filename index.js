const createElemet = (type,props)=>{
    var node = document.createElement(type);
    Object.keys(props).forEach(propName => {
        if (propName !== 'children') {
            node.setAttribute(propName, props[propName]);
        }
    });
}

const React = (()=>{
    let hooks  = []
    let idx = 0

    function useState(intitalValue){
        let state  = hooks[idx] || intitalValue
        let _idx = idx
        let setState = (newValue)=>{
            hooks[_idx] = newValue
        }
        idx++
        return [state,setState]
    }

    function useRef (val){
        return useState({current:val})[0]
    }

    function useEffect (callbacks, depArrays) {
        const oldDeps = hooks[idx]
        let hasChanged = true
        if(oldDeps){
            hasChanged  = depArrays.some((item ,index)=>!Object.is(item,oldDeps[index]))
        }
        hasChanged  && callbacks && callbacks()
        hooks[idx] = depArrays
    }
    
    function render (Com){
        idx = 0 
        let C = Com()
        C.render()
        return C
    }

    return {
        useState,
        useRef,
        useEffect,
        render,
        createElemet
    }
})()


const Component  = () =>{
    const [count,setCount] = React.useState(0)
    const [text,setText] = React.useState("This is the sample Text")
    const ref = React.useRef(1)
    React.useEffect(()=>{
    },[count])
    return  {
        render :()=>{
            console.log("count , text : ", count ,text);
        },
        click : ()=>{
            setCount(count+1)
        },
        type : (word) =>{
            setText(word)
        }
    }
}

var app  = React.render(Component)
app.click()
app  = React.render(Component)
app.click()
app  = React.render(Component)
app.type("Updated Text")
app  = React.render(Component)