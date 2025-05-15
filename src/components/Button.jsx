const Button = function({onClickFunc, buttonText, className=""}){
	return(
		<input className={className} type="button" onClick={onClickFunc} value={buttonText} />
	);
};

export default Button;