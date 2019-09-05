import Switch from '@material-ui/core/Switch';
import React from 'react';


export interface IConfigProps {
    hidden: boolean;
}

const Setting: React.FunctionComponent<IConfigProps> = (props: IConfigProps): JSX.Element => {
    return (
        <div hidden={props.hidden}>
            <Switch
                value="checkedB"
                color="primary"
            />
        </div>
    );
}

export default Setting;