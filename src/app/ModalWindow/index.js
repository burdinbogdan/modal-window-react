import React, { Component } from 'react';
import {connect} from 'react-redux';

import PickerList from './PickerList';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar  from 'material-ui/AppBar';
import IconButton  from 'material-ui/IconButton';
import Paper  from 'material-ui/Paper';
import SelectField  from 'material-ui/SelectField';
import MenuItem  from 'material-ui/MenuItem';
import TextField  from 'material-ui/TextField';
import FloatingActionButton  from 'material-ui/FloatingActionButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const styles = {
    modalWindow:{
      width: 400,
      padding: 30
    },
    appBar: {
      style: {
        borderRadius: "5px 5px 0 0",
        backgroundColor: "rgb(240, 240, 240)",
        boxShadow: "none" 
      },
      titleStyle: {
        color: "black", 
        padding: 0, 
        marginLeft: -10, 
        fontSize: 18
      },
      iconStyle :{
        fill: "black"
      },
    },
    flatButton:{
      style:{
        borderRadius: "5px",
      },
      labelStyle:{
        fontSize:'12px',
      },
    },
    PickerList:{
      button:{
        labelStyle:{
          fontSize:'13px',
        }
      }
    },
    buttons:{
      margin: "19px 16px",
      button:{
        style:{
          height: 32,
          lineHeight:"32px",
          marginRight:2,
          borderRadius: "5px",
          padding:"0px 0px"
        },
        save:{
          height: 32,
          lineHeight:"32px",
          marginRight:2,
          borderRadius: "5px",
          padding:"0px 0px",
          color:"white"
        }
      }
    }
};

var closeModalWindow = function() {
    return () => {
        document.getElementsByClassName('modal-window')[0].style.display = 'none';
    }
}

const ModalWindow = (props) => (
  <MuiThemeProvider>
      <Paper className="modal-window" style={styles.modalWindow} zDepth={1} >
 
          <AppBar style={styles.appBar.style}
                  titleStyle={styles.appBar.titleStyle}
                  title={props.title}
                  showMenuIconButton={false}
                  iconElementRight=
              {
                <IconButton onClick={closeModalWindow()} 
                            iconStyle={styles.appBar.iconStyle}>
                  <NavigationClose />
                </IconButton>}/>

          <div> 
            <PickerList />
            <FlatButton label="Добавить" 
                        primary={true} 
                        style={styles.flatButton.style}
                        labelStyle={styles.PickerList.button.labelStyle} 
                        onClick={props.addSelectFieldState}/>
          </div>

          <div  style={styles.buttons}>
            <FlatButton style={styles.buttons.button.save} 
                        labelStyle={styles.flatButton.labelStyle, styles.flatButton.labelStyle} 
                        label="Сохранить" 
                        hoverColor="rgb(82, 216, 255)"
                        backgroundColor="rgb(31, 185, 230)"
                        onClick={closeModalWindow()}/>
            <FlatButton style={styles.buttons.button.style} 
                        labelStyle={styles.flatButton.labelStyle} 
                        label="Отмена" 
                        onClick={closeModalWindow()}/>
          </div>

      </Paper>
  </MuiThemeProvider>
);

export default connect(
    state => ({

    }),
    dispatch => ({
        addSelectFieldState: () => {
            dispatch({ type: 'ADD_STATE', id: Date.now() });
        }
    })
)(ModalWindow);