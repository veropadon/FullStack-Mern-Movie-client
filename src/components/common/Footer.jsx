import {  Paper, Stack, Button, Box } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from '../../configs/menu.configs.js';





const Footer = () => {
    return (
      <Container>
        <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
            <Stack
                alignItems="center"
                justifyContent= "space-between"
                direction={{ xs: "column", md: "row"}}
                sx={{ height: "max-content" }}
                >

                <Logo/>
                <Box>
                {menuConfigs.main.map((item, index) => (
    <Button key={index}>
        {item.display}
    </Button> 
))}
                </Box>

            </Stack>

        </Paper>

      </Container>
    );
};

export default Footer;