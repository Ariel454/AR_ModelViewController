import React, { useState } from 'react';
import './sidebarStyles.css';
import { List, ListItem, ListItemText, Collapse, Badge } from '@mui/material';

interface SidebarProps {
  options: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ options }) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  return (
    <div className="sidebar">
      <List>
        {options.slice(0, 7).map((option, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              className={`custom-list-item ${index === 0 ? 'active' : ''}`}
              onClick={() => handleItemClick(index)}
            >
              <ListItemText primary={option} />

            </ListItem>
            {(index === 1 || index === 2 || index === 4) && (
              <Collapse in={expandedItem === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {index === 4 ? (
                    <>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[10]} />
                      </ListItem>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[11]} />
                      </ListItem>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[12]} />
                      </ListItem>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[13]} />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[8]} />
                      </ListItem>
                      <ListItem button className="subitem">
                        <ListItemText primary={options[9]} />
                      </ListItem>
                    </>
                  )}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
        {options.length === 14 && (
          <ListItem className="custom-list-item">
            <ListItemText primary={options[7]} />
            <Badge badgeContent="Nuevo" color="success" className="badge-root" />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Sidebar;
