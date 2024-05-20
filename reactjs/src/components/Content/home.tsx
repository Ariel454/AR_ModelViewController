import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import './contentStyles.css'; 

interface InfoInvestments {
  title: string;
  info: string;
  button: string;
}

interface Titles {
    titles: string[];
  }

interface Cuentas {
cuenta1: {
    nombre: string;
    id: string;
    saldo: string;
};
cuenta2: {
    nombre: string;
    id: string;
    saldo: string;
};
cuenta3: {
    nombre: string;
    id: string;
    saldo: string;
};
cuenta4: {
    nombre: string;
    id: string;
    saldo: string;
};
cuenta5: {
    nombre: string;
    id: string;
    saldo: string;
    fecha?: string;
};
}

interface ContentProps {
  infoInvestments: InfoInvestments | null; // Prop para recibir infoInvestments
  titles: Titles | null;
  cuentas: Cuentas | null; 
}

const Content: React.FC<ContentProps> = ({ infoInvestments, titles, cuentas }) => {
  return (
    <Box className="container">
        <Box className="firstContainer">
            <Box className="content-section">
                <Typography variant="h6" gutterBottom>
                {infoInvestments ? infoInvestments.title : "Titulo"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                {infoInvestments ? infoInvestments.info : "Pequeño texto"}
                </Typography>
                <Button variant="contained" color="primary">
                {infoInvestments ? infoInvestments.button : "Botón"}
                </Button>
            </Box>
            <Box className="image-section">
                <img
                className="image"
                src="https://cdnbancawebprodcx6.azureedge.net/green/static/items/pbw-banca-web-app-ang/dist/es-EC/frame_banner_main_lg.2cefb00c24ac7a47b84f.svg"
                alt="Imagen"
                />
            </Box>
        </Box>
        <Box className="secondContainer">
            <Box className="titleContainer">
                <Typography variant="h6" gutterBottom>
                {titles && titles.titles[0]} 
                </Typography>
            </Box>
            <Box className="subtitleContainer">
                <Typography variant="subtitle1" gutterBottom>
                {titles && titles.titles[1]} 
                </Typography>
            </Box>
            <Box className="savingsContainer">
            <Box className="cornerContainerLeft">
                    <Box className="iconContainer">
                        <Box className="boxContainer">
                            <Box className="Row">
                                <Box className="column1">
                                    <Typography variant="body1" className="title"> {cuentas && cuentas.cuenta1.nombre}</Typography>
                                </Box>     
                                <Box className="column2">
                                    <Typography variant="body1" className="title"> {cuentas && cuentas.cuenta1.id}</Typography>   
                                </Box>  
                            </Box>
                            <Box className="line">
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[3]} </Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" className='saldo'>$ {cuentas && cuentas.cuenta1.saldo}</Typography>
                                </Box>                          
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[4]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" >${cuentas && cuentas.cuenta1.saldo}</Typography>
                                </Box>                          
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="cornerContainerRight">
                    <Box className="iconContainer">
                        <Box className="boxContainer">
                            <Box className="Row">
                                <Box className="column1">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta2.nombre}</Typography>
                                </Box>     
                                <Box className="column2">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta2.id}</Typography>   
                                </Box>  
                            </Box>
                            <Box className="line">
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[3]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" className="saldo">${cuentas && cuentas.cuenta2.saldo}</Typography>
                                </Box>                          
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1" >{titles && titles.titles[4]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" >${cuentas && cuentas.cuenta2.saldo}</Typography>
                                </Box>                          
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="Divider">
            </Box>
            <Box className="savingsContainer">
            <Box className="cornerContainerLeft">
                    <Box className="iconContainer">
                        <Box className="boxContainer">
                            <Box className="Row">
                                <Box className="column1">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta3.nombre}</Typography>
                                </Box>     
                                <Box className="column2">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta3.id}</Typography>   
                                </Box>  
                            </Box>
                            <Box className="line">
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[3]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" className="saldo">${cuentas && cuentas.cuenta3.saldo}</Typography>
                                </Box>                          
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[4]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1">${cuentas && cuentas.cuenta3.saldo}</Typography>
                                </Box>                          
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="cornerContainerRight">
                    <Box className="iconContainer">
                        <Box className="boxContainer">
                            <Box className="Row">
                                <Box className="column1">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta4.nombre}</Typography>
                                </Box>     
                                <Box className="column2">
                                    <Typography variant="body1" className="title" >{cuentas && cuentas.cuenta4.id}</Typography>   
                                </Box>  
                            </Box>
                            <Box className="line">
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[3]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" className="saldo">${cuentas && cuentas.cuenta4.saldo}</Typography>
                                </Box>                          
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[4]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1">${cuentas && cuentas.cuenta4.saldo}</Typography>
                                </Box>                          
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="Divider2">
            </Box>
            <Box className="subtitleContainer">
                <Typography variant="subtitle1" gutterBottom>
                {titles && titles.titles[2]} 
                </Typography>
            </Box>
            <Box className="creditsContainer">
            <Box className="cornerContainerLeft">
                    <Box className="iconContainer">
                        <Box className="boxContainer">
                            <Box className="Row">
                                <Box className="column1">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta5.nombre}</Typography>
                                </Box>     
                                <Box className="column2">
                                    <Typography variant="body1" className="title">{cuentas && cuentas.cuenta5.id}</Typography>   
                                </Box>  
                            </Box>
                            <Box className="line">
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[3]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1" className="saldo">${cuentas && cuentas.cuenta5.saldo}</Typography>
                                </Box>                          
                            </Box>
                            <Box className="Row">
                                <Box className="column1">               
                                <Typography variant="body1">{titles && titles.titles[5]}</Typography>
                                </Box>   
                                <Box className="column2">               
                                    <Typography variant="body1">{cuentas && cuentas.cuenta5.fecha}</Typography>
                                </Box>                          
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="Divider">
            </Box>
        </Box>
    </Box>
  );
};

export default Content;
