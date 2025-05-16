const Button = function({onClickFunc, buttonText, className="", disabled=false}){
	return(
		<input className={className} type="button" onClick={onClickFunc} value={buttonText} disabled={disabled} />
	);
};

export default Button;