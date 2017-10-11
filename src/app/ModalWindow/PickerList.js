import React from 'react';

import {connect} from 'react-redux';

import PickerListItem from './PickerListItem';

const styles = {
	pickerList:{
    	padding: "10px 7px 0px",
  	}
};


const PickerList = (props) => (
	<div className="picker-list" style={styles.pickerList} >
		{props.itemsState.map((state, index) =>
            <PickerListItem key={state.id}
            				id={state.id}
            				typeId={state.typeId} />
        )}
    </div>
);

export default connect(
    state => ({
        itemsState: state.itemsState,
    }),
)(PickerList);