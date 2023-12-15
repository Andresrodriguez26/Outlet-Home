import * as _React from 'react'; 

import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    Snackbar,
    TextField,
    Alert } from '@mui/material'; 

import InfoIcon from '@mui/icons-material/Info';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getDatabase, ref, push } from 'firebase/database'


// internal imports
import { useGetShop, ShopProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';
import { mortCalls } from '../../api';
import { display, flexbox } from '@mui/system';
import shopImage from '../../assets/images/nona-orlando.jpeg'; 



// creating our Shop CSS style object 
export const mortStyles = {
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${shopImage});`,
        height: '100%',
        width: '100%',
        color: 'white',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "550px", 
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.light,
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
        // gridTemplateColumns: '1fr 1fr'
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    button: {
        color: 'white', 
        borderRadius: '30px',
        height: '50px',
        width: '250px',
        marginTop: '15px'
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    stack2: {
        border: '1px solid', 
        borderColor: theme.palette.primary.main, 
        borderRadius: '50px', 
        width: '100%',
        marginTop: '10px'
    },
    typography: { 
        marginLeft: '0', 
        color: "white", 
        marginTop: '100px',
        marginBottom: '20px',
        fontWeight: 'bold'
    }

}


export interface SubmitMort {

    interest_rate: string,
    loan_amount: string,
    home_value: string,
    downpayment: string,
    duration_years: string,
    monthly_hoa: string,
    annual_property_tax: string,
    annual_home_insurance: string

}

   


interface MortProps {
    mortItem: SubmitMort
}


export const Mort = () => {
    // setup our hooks
    // const { shopData } = useGetShop(); //list of all our data objects 
    const [MortData, setMortData] = useState<[]>([])
    const [ currentShop, setCurrentShop] = useState<ShopProps>(); //one and only one object we will send to our cart 
    const [ cartOpen, setCartOpen ] = useState(false); 
    const { register, handleSubmit } = useForm<SubmitMort>({})
    const [ message, setMessage] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const [ open, setOpen ] = useState(false)

    const onSubmit: SubmitHandler<SubmitMort> = async (data: SubmitMort, event: any) => {
        if (event) event.preventDefault(); 
        let apicall_ = await mortCalls.getMort(data) 
        setMortData(apicall_)
    }


    // console.log(MortData)

    return (
        <Box sx={ mortStyles.main }>
            <NavBar />
            <Typography 
                variant = 'h2'
                sx = { mortStyles.typography }
                textAlign='center'
                >
                This is Your Mortgage Calculator 
            </Typography>  
            {/* added bottom part */}


            <form onSubmit={handleSubmit(onSubmit)} >
                <div style={{display:'flex', flexDirection:'column', width:'800px', margin:'50px auto', border:'solid white', padding:'5vh', backgroundColor: 'grey', borderRadius:'5px'}}>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'25px'}}>
                        <div>
                    <label htmlFor='interest_rate'>Whats the interest rate?</label>
                    <InputText {...register('interest_rate')} name='interest_rate' placeholder='Interest Rate Here' />
                        </div>
                        <div>
                    <label htmlFor='loan_amount'>What is the loan amount? </label>
                    <InputText {...register('loan_amount')} name='loan_amount' placeholder='Loan Amount (Optional)' />
                        </div>
                        <div>
                    <label htmlFor='home_value'>Home Value </label>
                    <InputText {...register('home_value')} name='home_value' placeholder='(Optional)' />
                        </div>
                        <div>
                    <label htmlFor='downpayment'>What is the Downpayment? </label>
                    <InputText {...register('downpayment')} name='downpayment' placeholder='(Optional)' />
                        </div>
                        <div>
                    <label htmlFor='duration_years'>How many years? </label>
                    <InputText {...register('duration_years')} name='duration_years' placeholder='(Optional)' />
                        </div>
                        <div>
                    <label htmlFor='monthly_hoa'>Monthly HOA  </label>
                    <InputText {...register('monthly_hoa')} name='monthly_hoa' placeholder='(Optional)' />
                        </div>
                        </div>
                    <div style={{display:'flex', flexDirection:'column', width:'120px', margin:'0px auto' }}>
                    <Button variant="contained" type='submit' >Search</Button>
                    </div>
                </div>
                
            </form>
            <div style= {{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '0px auto', width: '100%', justifyItems:'center', gap: '50px'}}>
                { MortData ? (MortData.map((shops: MortProps, index: number ) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={mortStyles.card}>
                            {/* <CardMedia 
                                component='img'
                                sx={mortStyles.cardMedia}
                                image={shop.imgSrc}
                                alt={shop.address}
                            /> */}
                            <CardContent>
                                <Stack 
                                    direction='column'
                                    justifyContent='space-between'
                                    alignItems = 'center'
                                    
                                >
                                    <Stack 

                                        direction = 'row'
                                        alignItems = 'center'
                                        justifyContent = 'space-between'
                                    >
                                        <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light }}>
                                            <AccordionSummary 
                                                expandIcon={<InfoIcon sx={{ color: theme.palette.primary.main }}/>}
                                            >
                                            <div style={{display:'flex', flexDirection:'column', margin: '0 auto', width:'400px'}}>
                                                <Typography>{shops.mortItem.interest_rate}</Typography>
                                                <Typography>Bathrooms: {shops.mortItem.loan_amount}</Typography>
                                                <Typography>Bedrooms: {shops.mortItem.duration_years}</Typography>
                                                <Typography>Living Area: {shops.mortItem.downpayment}sqft</Typography>
                                                <Typography>Property Type: {shops.mortItem.monthly_hoa}</Typography>
                                                <Typography>Zestimate: ${shops.mortItem.annual_home_insurance}</Typography>
                                            </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{shops.mortItem.interest_rate}</Typography>
                                                {/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUAz5_HZAIisjH2BP5h9WBhydbHSh_0zs &libraries=places"></script> */}
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
            
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))):""}
            </div>
            {/* <Dialog open={cartOpen} onClose={()=>{setCartOpen(false)}}>
                <DialogContent>
                    <DialogContentText>Add to Cart</DialogContentText>
                    <AddToCart cartItem = {currentShop as ShopProps}/>
                </DialogContent>
            </Dialog> */}
        </Box>
    )
}

    

    