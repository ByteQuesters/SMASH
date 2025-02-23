'use client'

import useStore,{ formStore, itemState } from "../store";

const PropertiesForm = () => {
    const { props, setProps } = formStore() as {
      props: Record<string, string>;
      setProps: (props: Record<string, string>) => void;
    };
    const { ind,setInd } = formStore();
    const {show,setShow} = formStore();
    const {items, setItems} = useStore() as itemState;
    const handleChange = (val:string,key:string) => {
        const tempProp = {...props};
        tempProp[key]=val;
        setProps(tempProp);
    }
    const handleSubmit = ()=>{
        console.log(JSON.stringify(props));
        const tempProp = [...items];
        tempProp[ind] = {...props};
        setItems(tempProp);
        setShow(false);
    }
    return (
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
          {Object.keys(props).map((element, index) => (
            <div key={index}>
              {(element == "width" ||
                element == "height" ||
                element == "border") && (
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">{element}</label>
                  <input
                    type="number"
                    value={parseInt(props[element]) || ""}
                    className="border p-2 rounded-md focus:ring focus:ring-blue-300"
                    onChange={(e) =>
                      handleChange(`${e.target.value}px`, element)
                    }
                  />
                </div>
              )}
              {(element == "borderOpacity" || element == "opacity") && (
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">{element}</label>
                  <input
                    type="number"
                    value={parseFloat(props[element]) || ""}
                    min={0}
                    max={1}
                    step={0.1}
                    className="border p-2 rounded-md focus:ring focus:ring-blue-300"
                    onChange={(e) => handleChange(e.target.value, element)}
                  />
                </div>
              )}
              {(element == "backgroundColor" || element == "borderColor") && (
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">{element}</label>
                  <input
                    type="color"
                    value={props[element] || "#000000"}
                    className="border p-1 rounded-md focus:ring focus:ring-blue-300"
                    onChange={(e) =>
                      handleChange(e.target.value, element)
                    }
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
}

export default PropertiesForm;