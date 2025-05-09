const Button = function({onClickFunc, buttonText}){
	return(
		<input type="button" onClick={onClickFunc} value={buttonText} />
	);
};

export default Button;