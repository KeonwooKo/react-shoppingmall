import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) { 

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        //누른 것의 인댁스를 구하고
        const currentIndex = Checked.indexOf(value)
        
        //전체 checked 된 state에서 현재 누른 체크박스가 있다면
        const newChecked = [...Checked]

        //Staet 넣어준다
        if(currentIndex === -1){
            newChecked.push(value)
        //빼주고
        }else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>            
            <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>                 
        </React.Fragment>
    )) 

  return (
      <div>
          <Collapse defaultActiveKey={['1']} >
          <Panel header="Category" key="0">
              {renderCheckboxList()}
          </Panel>
      </Collapse>
      </div>
  )
}

export default CheckBox