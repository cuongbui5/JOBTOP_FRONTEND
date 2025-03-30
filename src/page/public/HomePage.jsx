
import HeroSection from "../../components/web/HeroSection.jsx";
import RoleSelectionModal from "../../components/web/RoleSelectionModal.jsx";
import {useEffect, useState} from "react";
import {getStoredUser} from "../../utils/helper.js";



const HomePage = () => {
    const [visible,setVisible]=useState(false);
    useEffect(() => {
        const user=getStoredUser();
        if(user&&user.roles.length===0){
            setVisible(true)
        }

    }, []);

    return (
        <div>
            <HeroSection/>
            <RoleSelectionModal visible={visible}/>

        </div>

    );
};

export default HomePage;
