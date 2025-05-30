const LabelledInput = function({label, id, type='text', setState, state}){
	return(
		<div className="add-margin">
			<label htmlFor={id}>{label}:</label>
			<input className="field" type={type} id={id} name={id} onChange={(e)=>{setState(e.target.value)}} value={state} />
		</div>
	)
};

export default LabelledInput;