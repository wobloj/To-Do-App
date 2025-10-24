import { useState } from "react";
import { BottomNavigation } from "@mui/material"
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Home } from "@mui/icons-material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CreateIcon from '@mui/icons-material/Create';
import { Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      className="fixed bottom-0 w-full border-t"
      sx={{
        background:"#F5F5DC",
      }}
    >
      <Link to={"/creator"}>
        <BottomNavigationAction
          label="Creator"
          icon={<CreateIcon />}
        />
      </Link>
      <BottomNavigationAction
        label="TODO List"
        icon={<ChecklistIcon />}
      />
      <BottomNavigationAction
        label="Shopping List"
        icon={<ReceiptLongIcon />}
      />
    <BottomNavigationAction
        label="Sign In"
        icon={<Person />}
      />
    </BottomNavigation>
  )
}
