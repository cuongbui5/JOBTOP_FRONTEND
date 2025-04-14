import {Button} from "antd";

// eslint-disable-next-line react/prop-types
const CustomButton=({content,type,size})=>{
    return( <Button type={type}
                   size={size}
                   htmlType="submit"
                   style={{borderRadius: "0"}}
    >{content}
    </Button>)
}

export default CustomButton;