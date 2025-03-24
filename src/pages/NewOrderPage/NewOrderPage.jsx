import { useState, useEffect } from "react";
import * as itemsAPI from "../../utilities/items-api";

export default function NewOrderPage() {
  const [ menuItems, setMenuItems ] = useState([]);

  // Empty dependency array causes the effect to run only after the first render:
  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      setMenuItems(items);
    }
    getItems();
  }, []);

  return (
    <h1>NewOrderPage</h1>
  );
}