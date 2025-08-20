import { Remove } from "@mui/icons-material";
import { FC } from "react"

interface IShoppingListPreview {
  title: string;
  shop: string;
  items: { name: string; quantity: number }[];
}

export const ShoppingListPreview:FC<IShoppingListPreview> = ({title, shop, items}) => {
  return (
    <div className="flex flex-col items-center">
        <div className="border-2 px-8 py-4 rounded-2xl mb-10">
            <p className="text-lg font-bold">{title}</p>
            <p className="text-lg mb-4">{shop}</p>
            <ul className="list-inside list-none flex flex-col justify-start items-start rounded-xl hover:bg-orange-500/10 px-4 py-2">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-row items-center justify-between gap-4 w-full font-light">
                    <li className="text-lg">{item.quantity}x {item.name}</li>
                    <Remove fontSize="small" className="cursor-pointer hover:text-orange-500" onClick={() => {console.log("removed: ",index)}}/>
                  </div>
                ))}
            </ul>
        </div>
    </div>
  )
}
