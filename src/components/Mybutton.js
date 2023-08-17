const Mybutton = ({text, type , onClick}) => {

    const btnType =['positive','negative'].includes(type)?type:'default';


    return (
        <button className={["Mybutton",`Mybutton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
}

Mybutton.defaultProps = {
    type : 'default',
};

export default Mybutton;