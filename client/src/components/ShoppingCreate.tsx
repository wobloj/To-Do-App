import {useEffect, useState} from "react"
import { Input } from "./Input"
import { FormControl, IconButton, InputLabel, MenuItem, Select, Stepper, Step, StepLabel } from "@mui/material"
import { Add } from "@mui/icons-material"
import { Button } from "./Button"
import { ShoppingListPreview } from "./ShoppingListPreview"

export const ShoppingCreate = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("New Shopping List");
  const [shop, setShop] = useState("");
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [list , setList] = useState<{ title: string; shop: string; items: { name: string; quantity: number }[] }>({ title: "", shop: "", items: [] });

  useEffect(() =>{
    if(list){
      console.log("Current Shopping List:", list);
    }
  }, [list])

  const handleSaveList = () => {
    const newList = { title, shop, items };
    setList(newList);
    console.log("Shopping List Saved:", newList);

    setActiveStep(0);
    setTitle("New Shopping List");
    setShop("");
    setItems([]);
  };

  const handleStep = () => {
    setActiveStep(activeStep + 1);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return true;
      case 1:
        return items.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  }

  return (
    <div className="text-center mx-20 w-full flex flex-col justify-top">
      <h1 className="text-3xl mb-20">Create new shopping list</h1>
      <Stepper className="mb-20" activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Title and shop</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add to shopping list</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirm and save</StepLabel>
        </Step>
      </Stepper>
        {activeStep === 0 && 
        <>
          <p className="text-xl font-light mb-20">Enter Your shopping list title and select shop</p>
          <Input onChange={(e) => {setTitle(e.target.value)}} position="items-center" type="text" placeholder="Title" label="title" title="Title" className="w-1/2 text-center mb-10"/>
          <FormControl className="w-1/3 self-center">
            <InputLabel id="shop-label">Shop</InputLabel>
            <Select value={shop} onChange={(e) => setShop(e.target.value as string)} labelId="shop-label" label="Shop" className="mb-10">
              <MenuItem value="Lidl">Lidl</MenuItem>
              <MenuItem value="Biedronka">Biedronka</MenuItem>
              <MenuItem value="Netto">Netto</MenuItem>
              <MenuItem value="Auchan">Auchan</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </>}
        
        {activeStep === 1 && 
        <>
          <p className="text-xl font-light mb-10">Type Your product to buy.</p>
          <div className="my-10 flex flex-row items-end justify-center gap-2">
              <Input
                required
                isLabel={false}
                position="items-center"
                type="number"
                placeholder="Qnt."
                label="qnt"
                title="Quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
                className="ml-10 w-20 text-center"
              />
              <Input
                required
                isLabel={false}
                position="items-center"
                type="text"
                placeholder="Product"
                label="task"
                title="Task"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="ml-10 w-96 text-center"
              />
              <IconButton
                onClick={() => {
                  if (productName.trim() && productQuantity > 0) {
                    setItems([...items, { name: productName.trim(), quantity: productQuantity }]);
                    setProductName("");
                    setProductQuantity(1);
                  }
                }}
              >
                <Add color="warning" />
              </IconButton>
          </div>
          <ShoppingListPreview title={title} shop={shop} items={items}/>
        </> }

        {activeStep === 2 && 
        <>
          <p className="text-xl font-light mb-4">Confirm Your shopping list.</p>
          <ShoppingListPreview title={title} shop={shop} items={items}/>
        </>}
        <div className="flex flex-row justify-center items-center gap-5">
          {activeStep > 0 && <Button onClick={() => setActiveStep(activeStep-1)} type="button">Back</Button>}
          {activeStep === 2 ? 
          <Button onClick={() => handleSaveList()} type="button">Save</Button>:
          <Button disabled={!isStepValid()} onClick={() => handleStep()} type="button">Next</Button>}
        </div>
    </div>
  )
}
