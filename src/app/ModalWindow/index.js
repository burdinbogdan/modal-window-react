import React, {Component} from 'react';
import {connect} from 'react-redux';

import PickerList from './PickerList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar  from 'material-ui/AppBar';
import IconButton  from 'material-ui/IconButton';
import Paper  from 'material-ui/Paper';
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

var closeModalWindow = function(callback) {
    return () => {
        document.getElementsByClassName('modal-window')[0].style.display = 'none';
        if(callback) callback();
    }
}
class ModalWindow extends React.Component {
  constructor(props){
    super();
    this.title = props.title;
    this.addSelectFieldState = props.addSelectFieldState.bind(this);
    props.recoveryState();
    this.saveState = props.saveState.bind(this);
    this.undoState = props.undoState.bind(this);
  }
  render() {
    return(
        <MuiThemeProvider >
            <Paper className="modal-window" style={styles.modalWindow} zDepth={1} >
       
                <AppBar style={styles.appBar.style}
                        titleStyle={styles.appBar.titleStyle}
                        title={this.title}
                        showMenuIconButton={false}
                        iconElementRight=
                    {
                      <IconButton onClick={closeModalWindow(this.undoState)} 
                                  iconStyle={styles.appBar.iconStyle}>
                        <NavigationClose />
                      </IconButton>}/>

                <div> 
                  <PickerList />
                  <FlatButton label="Добавить" 
                              primary={true} 
                              style={styles.flatButton.style}
                              labelStyle={styles.PickerList.button.labelStyle} 
                              onClick={this.addSelectFieldState}/>
                </div>

                <div  style={styles.buttons}>
                  <FlatButton style={styles.buttons.button.save} 
                              labelStyle={styles.flatButton.labelStyle, styles.flatButton.labelStyle} 
                              label="Сохранить" 
                              hoverColor="rgb(82, 216, 255)"
                              backgroundColor="rgb(31, 185, 230)"
                              onClick={closeModalWindow(this.saveState)}/>
                  <FlatButton style={styles.buttons.button.style} 
                              labelStyle={styles.flatButton.labelStyle} 
                              label="Отмена" 
                              onClick={closeModalWindow(this.undoState)}/>
                </div>

            </Paper>
        </MuiThemeProvider>
      );
    }
}
export default connect(
    state => ({}),
    dispatch => ({
        addSelectFieldState: () => dispatch({ type: 'ADD_STATE', id: Date.now() }),
        recoveryState: () => dispatch({ type: 'RECOVERY_STATE' }),
        saveState: () => dispatch({ type: 'SAVE_STATE' }),
        undoState: () => dispatch({ type: 'UNDO_STATE' }),
    })
)(ModalWindow);