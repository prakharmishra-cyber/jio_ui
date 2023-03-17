import React, { useEffect, useLayoutEffect, useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';

import { useContext } from 'react';
import { AmountContext } from '../App.js';
import money_bag from '../images/money_bag.png';
import axios from 'axios';
import BASE_URL from '../api_url';
import { VolumeUpOutlined } from '@material-ui/icons';
import new_invite_image from '../images/new_invite_image.png';
import invite_bg from '../images/invite_bg.png';
import windharvester_logo from '../images/windharvester_logo.png';
import rent from '../images/rent.png';
import financial from '../images/financial.png';
import user from '../images/user.png';
import make_money from '../images/make_money.png';
import dividend from '../images/dividend.png';
import wind1 from '../images/wind1.jpg';
import wind2 from '../images/wind2.jpg';
import wind3 from '../images/wind3.jpg';
import wind4 from '../images/wind4.jpg';



import tuborg1 from '../images/tuborg1.jpg';
import tuborg2 from '../images/tuborg2.jpg';
import tuborg3 from '../images/tuborg3.jpg';
import tuborg4 from '../images/tuborg4.jpg';
import tuborg5 from '../images/tuborg5.jpg';
import tuborg6 from '../images/tuborg6.jpg';

import asset30 from '../images/assets3/asset 0.png';
import asset31 from '../images/assets3/asset 1.png';
import asset32 from '../images/assets3/asset 2.png';
import asset33 from '../images/assets3/asset 3.png';
import asset35 from '../images/assets3/asset 5.avif';
import asset36 from '../images/assets3/asset 6.avif';
import asset37 from '../images/assets3/asset 7.avif';
import asset38 from '../images/assets3/asset 8.avif';


import lenskart1 from '../images/assets5/lenskart1.jpg';
import lenskart2 from '../images/assets5/lenskart2.jpg';
import lenskart3 from '../images/assets5/lenskart3.jpg';
import lenskart4 from '../images/assets5/lenskart4.jpg';
import lenskart5 from '../images/assets5/lenskart5.jpg';
import lenskart6 from '../images/assets5/lenskart6.jpg';
import lenskart7 from '../images/assets5/lenskart7.jpg';
import lenskart8 from '../images/assets5/lenskart8.jpg';
import lenskart9 from '../images/assets5/lenskart9.jpg';
import lenskart10 from '../images/assets5/lenskart10.jpg';
import lenskart11 from '../images/assets5/lenskart11.jpg';
import lenskart12 from '../images/assets5/lenskart12.jpg';

import asset0 from '../images/asml/asset 0.png';
import asset1 from '../images/asml/asset 1.png';
import asset2 from '../images/asml/asset 2.png';
import asset3 from '../images/asml/asset 3.png';
import asset4 from '../images/asml/asset 4.jpeg';
import asset5 from '../images/asml/asset 5.png';
import asset6 from '../images/asml/asset 6.png';
import asset7 from '../images/asml/asset 7.png';
import asset8 from '../images/asml/asset 8.png';
import jio from '../images/asml/jio.png';

import item1 from '../images/asml/item1.jpg';
import item2 from '../images/asml/item2.jpg';
import item3 from '../images/asml/item3.jpg';
import item4 from '../images/asml/item4.jpg';
import item5 from '../images/asml/item5.jpg';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
        width: '95%',
        border: 'none',
        backgroundColor: 'transparent'

    },
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
        border: 'none',
        padding: 0,
        width: '97%',
        borderRadius: '16px'
    },
};


const Home = () => {

    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [currPlan, setCurrPlan] = React.useState(null);
    const [currentVisible, setCurrentVisible] = React.useState('big');
    const [userDetails, setUserDetails] = React.useState(null);
    const amountDetails = useContext(AmountContext);
    const [toasterShow, setToasterShow] = useState(false);
    const [welcomeShow, setWelcomeShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [originalwpwd, setOriginalwpwd] = useState(null);
    const [originalpwd, setOriginalpwd] = useState(null);
    const [planPurchaseShow, setPlanPurchaseShow] = useState(false);
    const [balanceIndicator, setBalanceIndicator] = useState(false);

    const toaster = (text, arg = '') => {
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        if (text === 'Plan purchased!') {
            setTimeout(() => {
                navigate('/project');
            }, 2000);
        } else {
            setToasterText(text);
            setToasterShow(true);
            setTimeout(() => {
                setToasterShow(false);
                //navigate('/mine');
                if (arg !== '') {
                    navigate('/project');
                }
            }, 2000);
        }
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const getUserDetails = async () => {
        await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => {
            if (data) {
                setUserDetails(data);
                setOriginalwpwd(data.wpwd);
                setOriginalpwd(data.pwd);
                localStorage.setItem('user_invite', data.user_invite);
            } else {
                //console.log('Data not found');
            }
        }).catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        if (localStorage.getItem('pop_up_closed') === null) {
            setWelcomeShow(true);
        }
    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#103ad8";
        getUserDetails();
    }, []);

    const closeModal = async (action) => {
        if (action === 'cancel') {
            setIsOpen(false);
        } else if (quantity <= 0) {
            toaster('Please a positive value!');
        } else {
            if ((Number(quantity) * Number(currPlan.plan_amount)) > Number(userDetails.balance)) {
                //toaster("The available balance is insufficient, please recharge");
                setBalanceIndicator(true);
                setTimeout(() => {
                    setBalanceIndicator(false);
                }, 3000);
            } else {
                await axios.post(`${BASE_URL}/purchase`, {
                    balance: Number(userDetails.balance) - Number(Number(quantity) * Number(currPlan.plan_amount)),
                    boughtLong: (currPlan.product_type === 'long' ? 1 : 0),
                    boughtShort: (currPlan.product_type === 'short' ? 1 : 0),
                    user_id: localStorage.getItem('uid'),
                    plans_purchased: {
                        ...currPlan,
                        quantity: quantity,
                        date_purchased: new Date().toDateString(),
                        date_till_rewarded: new Date().toDateString(),
                        time: new Date().toDateString(),
                        ddmmyy: new Date().getMilliseconds()
                    }
                }).then(() => {
                    console.log('Product successfully purchased');
                    toaster('Plan purchased!', '/project');
                    setPlanPurchaseShow(true);
                }).catch((error) => {
                    console.log('Some error occured', error);
                    toaster('Some error occured, try again after some time');
                })
            }
            setIsOpen(false);
        }
    }

    const isBetween = () => {
        var startTime = '8:00:00';
        var endTime = '17:00:00';

        var currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        var valid = startDate < currentDate && endDate > currentDate;
        //console.log(valid);
        return valid;
    }

    const handleClick = (product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle) => {
        setCurrPlan({ product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle });
        openModal();
    }



    return (
        <div className='relative bg-red-800 px-1'>
            {toasterShow  ? <div className='w-[90%] absolute z-50 top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 text-center bg-black opacity-90 text-white px-4 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}

            {planPurchaseShow ? <div className='absolute w-[65%]  top-[450px] rounded-lg shadow-xl  z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex flex-col justify-center gap-3 h-[180px] shadow-2xl border border-gray-300 items-center bg-white w-full text-red-800 rounded-xl'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='text-2xl font-extrabold'>Successful Purchase</div>
                </div>
            </div> : null}

            <div >
                <ReactModal
                    isOpen={balanceIndicator}
                    style={customStyles2}
                    contentLabel="Not enough balance"
                    ariaHideApp={false}
                >
                    <div className='relative bg-black text-center text-white opacity-90 p-2 w-full rounded-md '>
                        The available balance is insufficient, please recharge
                    </div>
                </ReactModal>
            </div>



            <Slider />
            <div >
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Enter Project Quantity"
                    ariaHideApp={false}
                >

                    <div className='relative bg-white p-2 w-full rounded-sm '>
                        <div
                            onClick={() => closeModal('cancel')}
                            className='absolute  right-[-10px] top-[-10px] bg-white font-extrabold  w-10 h-10 text-white  flex justify-center items-center rounded-full'>
                            <div className='bg-slate-500 w-7 h-7 rounded-full text-center text-xl'>
                                X
                            </div>
                        </div>
                        <div>
                            <h1 className='text-gray-600 mb-3 mt-2 text-md mr-5 font-semibold'>Are you sure you want to buy this plan?</h1>

                            <div className='flex justify-end pt-4'>
                                <button onClick={() => closeModal('ok')} className='bg-red-800 text-white px-2 py-1   w-[64px]'>Yes</button>
                                <button onClick={() => closeModal('cancel')} className='border border-gray-300  px-2 py-1   w-[64px] ml-2'>No</button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>

            <div>
                <ReactModal
                    isOpen={welcomeShow}
                    style={customStyles2}
                    contentLabel="Notice"
                    ariaHideApp={false}
                >
                    <div className='w-full rounded-lg shadow-xl z-10 border border-gray-200'>
                        <div className='flex  flex-col bg-white w-full text-white rounded-md'>
                            <div className='flex flex-col p-2 text-sm gap-2 font-normal bg-white text-red-600 text-semibold pt-4 mb-[5px]'>
                                Withdrawal time: 09:00—20:00 <br />
                                Register to send 100rs

                                <img src={jio} alt="jio" width={240} className='p-2' />

                                <span className="text-red-800">Reliance Jio Infocomm Limited, doing business as Jio, is an Indian 
                                telecommunications company and a subsidiary of Jio Platforms, 
                                headquartered in Navi Mumbai, Maharashtra, India. It operates 
                                a national LTE network with coverage across all 22 telecom circles.
                                    <br />
                                    (Each user is able to receive additional rewards through invitations)
                                </span>
                                
                                Invitation Commission: <br />
                                Level 1 {amountDetails.level1_percent}% <br />
                                Level 2 {amountDetails.level2_percent}% <br />
                                Level 3 {amountDetails.level3_percent}%
                            </div>

                            <div className='border-t border-gray-300 my-1'></div>

                        </div>
                        <div className='flex justify-end'>
                            <button className='text-center w-16 mx-2 border border-blue-400 mt-1 text-white font-semibold p-1 mb-2 bg-gray-800'
                                onClick={(e) => {
                                    setWelcomeShow(false);
                                    localStorage.setItem('pop_up_closed', 1);
                                }}>
                                Ok
                            </button>
                        </div>
                    </div>
                </ReactModal>
            </div>

            {/*Marquee Implementation*/}
            {/* <div className="bg-red-800 rounded-md items-center px-2 text-white relative flex overflow-x-hidden h-12 mx-auto mt-2 border-2 border-gray-100 sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                <div>
                    <VolumeUpOutlined />
                </div>
                <div className="py-12 animate-marquee flex flex-col whitespace-nowrap">
                    <span className="mx-4 text-sm">91915***05 Member withdrawl 100000 Rs</span>
                    <span className="mx-4 text-sm">91702***84 Member withdrawl 30000 Rs</span>
                    <span className="mx-4 text sm">91827***42 Member withdrawl 2000 Rs</span>
                    <span className="mx-4 text sm">91770***28 Member withdrawl 500 Rs</span>
                    <span className="mx-4 text sm">91983***17 Member withdrawl 100000 Rs</span>
                </div>
            </div> */}

            {/*Navigation bar */}
            <div className="bg-white  text-black font-semibold relative flex overflow-x-hidden  mx-1 py-2  sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                <div className="flex flex-row justify-around text-xs items-center w-full py-2 px-3">
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={asset0} alt="recharge" className='w-10' onClick={() => navigate('/recharge')} />
                        <div className='text-lg text-red-700'>Recharge</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={asset1} alt="invite" className='w-12' onClick={() => isBetween()  ?
                            navigate('/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } }) : toaster('You can withdraw only between 08:00 AM to 05:00 PM')
                        } />
                        <div className='text-lg text-red-700 '>Withdrawal</div>
                    </div>

                    <a href="https://wa.me/qr/QN6HWT7MXJNTM1" className=' no-underline  cursor-pointer'>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset2} alt="online" className='w-12' />
                            <div className='text-lg text-red-700 '>Online</div>
                        </div>
                    </a>

                    <a href="https://wa.me/qr/QN6HWT7MXJNTM1" className=' no-underline  cursor-pointer'>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset6} alt="online" className='w-10' />
                            <div className='text-lg text-red-700'>Invite</div>
                        </div>
                    </a>



                </div>
            </div>

            <div className='bg-red-800 text-md text-white flex mt-2 items-center  mb-2 sm:w-3/5 lg:w-3/5 mx-5'>
                <div className={`w-1/2 text-center  py-4 ${currentVisible === 'big' ? ' text-white font-medium bg-selected' : ' bg-nselected text-black'}`} onClick={() => setCurrentVisible('big')}>Daily Income</div>
                <div className={`w-1/2 text-center  py-4 ${currentVisible === 'short' ? ' text-white font-medium bg-selected' : ' bg-nselected text-black'}`} onClick={() => setCurrentVisible('short')}>Activity Income</div>
            </div>

            {/*Plans Cards*/}
            <div className={`card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[100%] mx-auto mt-2 ${currentVisible === 'big' ? 'mb-20' : ''}`}>

                {currentVisible === 'big' && (
                    <div className='grid grid-cols-1 '>
                        {userDetails && amountDetails?.plan_state && (
                            <div className='grid grid-cols-1 gap-4'>
                                {userDetails && (amountDetails.plan_state[0] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item1} handleClick={handleClick} plan_name={"Jio 1"} plan_cycle={35} plan_daily_earning={125} plan_amount={550} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item1} handleClick={handleClick} plan_name={"Jio 1"} plan_cycle={35} plan_daily_earning={125} plan_amount={550} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[1] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item2} handleClick={handleClick} plan_name={"Jio 2"} plan_cycle={35} plan_daily_earning={410} plan_amount={2500} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item2} handleClick={handleClick} plan_name={"Jio 2"} plan_cycle={35} plan_daily_earning={410} plan_amount={2500} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[2] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item3} handleClick={handleClick} plan_name={"Jio 3"} plan_cycle={35} plan_daily_earning={700} plan_amount={3500} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item3} handleClick={handleClick} plan_name={"Jio 3"} plan_cycle={35} plan_daily_earning={700} plan_amount={3500} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[3] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item4} handleClick={handleClick} plan_name={"Jio 4"} plan_cycle={35} plan_daily_earning={1000} plan_amount={5800} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item4} handleClick={handleClick} plan_name={"Jio 4"} plan_cycle={35} plan_daily_earning={1000} plan_amount={5800} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[4] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item5} handleClick={handleClick} plan_name={"Jio 5"} plan_cycle={35} plan_daily_earning={2205} plan_amount={12000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item5} handleClick={handleClick} plan_name={"Jio 5"} plan_cycle={35} plan_daily_earning={2205} plan_amount={12000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[5] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={1} product_type={"long"} product_image={item1} handleClick={handleClick} plan_name={"Jio 6"} plan_cycle={35} plan_daily_earning={4700} plan_amount={25000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={0} product_type={"long"} product_image={item1} handleClick={handleClick} plan_name={"Jio 6"} plan_cycle={35} plan_daily_earning={4700} plan_amount={25000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {/* {userDetails && (amountDetails.plan_state[6] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={lenskart7} handleClick={handleClick} plan_name={"Lenskart 7"} plan_cycle={60} plan_daily_earning={33000} plan_amount={76000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={lenskart7} handleClick={handleClick} plan_name={"Lenskart 7"} plan_cycle={60} plan_daily_earning={33000} plan_amount={76000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}

                                {/* {userDetails && (amountDetails.plan_state[7] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={tuborg4} handleClick={handleClick} plan_name={"Windharvester 8"} plan_cycle={365} plan_daily_earning={2500} plan_amount={35000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={tuborg4} handleClick={handleClick} plan_name={"Windharvester 8"} plan_cycle={365} plan_daily_earning={2500} plan_amount={35000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}

                                {/* {userDetails && (amountDetails.plan_state[8] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={tuborg5} handleClick={handleClick} plan_name={"Windharvester 9"} plan_cycle={365} plan_daily_earning={4000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={tuborg5} handleClick={handleClick} plan_name={"Windharvester 9"} plan_cycle={365} plan_daily_earning={4000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}
                            </div>)}
                    </div>)}

            </div>

            {/*short plans */}
            <div className={`card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[97%] mx-auto mt-2 ${currentVisible === 'short' ? 'mb-20' : ''}`}>

                {currentVisible === 'short' && amountDetails?.plan_state && userDetails && (
                    <div className={`grid grid-cols-1 gap-4`}>
                        {(userDetails.boughtLong < 1 || amountDetails.plan_state[6] === 0) ?
                            (
                                <span className='pointer-events-none'>
                                    {/* <span>hi</span> */}
                                    <Card pre_sale={1} product_type={"short"} product_image={item2} handleClick={handleClick} plan_name={"Jio 7"} plan_cycle={3} plan_daily_earning={300} plan_amount={600} plan_type={'Short Plan'} />
                                </span>
                            ) :
                            <span>
                                <Card pre_sale={0} product_type={"short"} product_image={item2} handleClick={handleClick} plan_name={"Jio 7"} plan_cycle={3} plan_daily_earning={300} plan_amount={600} plan_type={'Short Plan'} />
                            </span>
                        }

                        {(userDetails.boughtLong < 1 || amountDetails.plan_state[7] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={1} product_type={"short"} product_image={item3} handleClick={handleClick} plan_name={"Jio 8"} plan_cycle={4} plan_daily_earning={400} plan_amount={1000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={0} product_type={"short"} product_image={item3} handleClick={handleClick} plan_name={"Jio 8"} plan_cycle={4} plan_daily_earning={400} plan_amount={1000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(userDetails.boughtLong < 1 || amountDetails.plan_state[8] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={1} product_type={"short"} product_image={item4} handleClick={handleClick} plan_name={"Jio 9"} plan_cycle={4} plan_daily_earning={750} plan_amount={2000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={0} product_type={"short"} product_image={item4} handleClick={handleClick} plan_name={"Jio 9"} plan_cycle={4} plan_daily_earning={750} plan_amount={2000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(userDetails.boughtLong < 1 || amountDetails.plan_state[9] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={1} product_type={"short"} product_image={item1} handleClick={handleClick} plan_name={"Jio 10"} plan_cycle={3} plan_daily_earning={1500} plan_amount={3000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={0} product_type={"short"} product_image={item1} handleClick={handleClick} plan_name={"Jio 10"} plan_cycle={3} plan_daily_earning={1500} plan_amount={3000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(userDetails.boughtLong < 1 || amountDetails.plan_state[10] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={1} product_type={"short"} product_image={item5} handleClick={handleClick} plan_name={"Jio 11"} plan_cycle={3} plan_daily_earning={1800} plan_amount={4200} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={0} product_type={"short"} product_image={item5} handleClick={handleClick} plan_name={"Jio 11"} plan_cycle={3} plan_daily_earning={1800} plan_amount={4200} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {/* {(userDetails.boughtLong < 1 || amountDetails.plan_state[12] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card product_type={"short"} product_image={lenskart1} handleClick={handleClick} plan_name={"Lenskart 12"} plan_cycle={5} plan_daily_earning={120000} plan_amount={60000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card product_type={"short"} product_image={lenskart1} handleClick={handleClick} plan_name={"Lenskart 12"} plan_cycle={5} plan_daily_earning={120000} plan_amount={60000} plan_type={'Short Plan'} />
                            </span>
                            )} */}

                        {/* {(userDetails.boughtLong < 1 || amountDetails.plan_state[15] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card product_type={"short"} product_image={wind4} handleClick={handleClick} plan_name={"Windharvester 16"} plan_cycle={18} plan_daily_earning={1400} plan_amount={10000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card product_type={"short"} product_image={wind4} handleClick={handleClick} plan_name={"Windharvester 16"} plan_cycle={18} plan_daily_earning={1400} plan_amount={10000} plan_type={'Short Plan'} />
                            </span>
                            )} */}
                    </div>)}
            </div>



            {/*Navigation Bar 2 bg-[#1cb5b2]*/}
            {welcomeShow ? (
                <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-red-800 flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                    <div className="flex flex-row justify-around items-center w-full py-1 text-sm font-normal">
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset5} alt="online" className='w-7' />
                            <div>Home</div>
                        </div>

                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset6} alt="recharge" className='w-7' />
                            <div>Invite</div>
                        </div>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center '>
                            <img src={asset7} alt="app_dwd" className='w-7' />
                            <div>Team</div>
                        </div>


                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset8} alt="invite" className='w-7' />
                            <div>My</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                    <div className="flex flex-row justify-around font-normal text-sm items-center w-full py-1">
                        <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={asset5} alt="online" className='w-7' />
                            <div>Home</div>
                        </div>

                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/invite')}>
                            <img src={asset6} alt="recharge" className='w-7' />
                            <div>Invite</div>
                        </div>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' onClick={() => navigate('/team')}>
                            <img src={asset7} alt="app_dwd" className='w-7' />
                            <div>Team</div>
                        </div>


                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/mine')}>
                            <img src={asset8} alt="invite" className='w-7' />
                            <div>My</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home