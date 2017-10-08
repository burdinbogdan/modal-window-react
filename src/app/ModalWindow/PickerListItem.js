import React from 'react';

import {connect} from 'react-redux';

import SelectField  from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import TextField  from 'material-ui/TextField';
import IconButton  from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import getMuiTheme from 'material-ui/styles/getMuiTheme';



const styles = {
	selectField:{
		style:{
			width: 95,
	        margin: "0 10px",
	        float: "left",
	        fontSize: 14
		},
		iconStyle:{
			width:20, 
			padding:0
		},
		labelStyle:{
			paddingRight:18
		}
	},
	textField:{
		width:32,
    	margin: "0 6px",
        float: "left",
        fontSize:15
	},
	iconButton:{
		style:{
			backgroundColor: "rgba(255, 1, 1, 0.1)", 
			borderRadius: "50%",
			width: 34,
		    height: 34,
		    padding: 0, 
		    margin:6,
		},
		iconStyle:{
			color: "#f44336", 
			padding: 0
		}
	},
};


let getItemType = function(itemVariances, typeId) {
    return itemVariances.filter((val) => (val.id == typeId))[0];
}

const PickerListItem = (props) =>(
	<div className="item-selection" >
		<SelectField value={props.typeId}
					 style={styles.selectField.style}
					 iconStyle={styles.selectField.iconStyle}
					 labelStyle={styles.selectField.labelStyle}
					 onChange={props.changeSelectFieldState()}>
		    {props.itemVariances.map((item, index) =>
	            <MenuItem key={item.id} 
	            		  value={item.id} 
	            		  primaryText={item.type}
	            		   />
	        )}
		</SelectField>
		<TextField id={""+props.id} 
				   value={getItemType(props.itemVariances, props.typeId).num} 
				   type='number'
				   onChange={props.changeTextFieldState(getItemType(props.itemVariances, props.typeId))}
				   style={styles.textField}/>
		<IconButton color="primary" 
		          	iconStyle={styles.iconButton.iconStyle}
		          	style={styles.iconButton.style}
		          	onClick={props.removeSelectFieldState()}>
			          	<NavigationClose />
		          	</IconButton>
		          	
        <div style={{clear:"both"}}></div> 
	</div>
);



export default connect(
    state => ({
        itemVariances: state.itemVariances,


    }),
    dispatch => ({
        changeSelectFieldState: function() {
            return (proxy, index, typeId) => 
                dispatch({ type: 'CHANGE_STATE', changedState: { id: this.id, typeId } });
        },
        changeTextFieldState: function(e){
        	let variances = this.itemVariances.sort((item1, item2) => 
        		(item1.num%10 + ~~(item1.num%100/10)) - (item2.num%10 + ~~(item2.num%100/10)));
        	return function(proxy, index){
        		let changedState = {id: this.id};
        		for(let i=0; i<variances.length; i++){
        			if(variances[i].num == this.value){
		        		if(index-this.value >= 0 && variances[i+1]){
		        			changedState.typeId = variances[i+1].id;
		        		}else if(index-this.value <= 0 && variances[i-1]){
		        			changedState.typeId = variances[i-1].id;
		        		}else {
		        			return;
		        		}
		        		break;
        			}	
    			}
        		dispatch({type: 'CHANGE_STATE', changedState});
        	}

        },
        removeSelectFieldState: function() {
            return () => dispatch({ type: 'REMOVE_STATE', id: this.id });
        },

    })
)(PickerListItem);