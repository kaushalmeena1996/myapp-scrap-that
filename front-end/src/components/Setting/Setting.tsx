import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export interface SettingProps {
    hidden: boolean;
}

const Setting: React.FunctionComponent<SettingProps> = (props: SettingProps): JSX.Element => {
    return (
        <div hidden={props.hidden}>
            <Container maxWidth="sm">
                <Typography variant="subtitle1" color="textSecondary" align="center">
                    Copyright © 2019 ScrapThat!
                </Typography>
            </Container>
        </div>
    );
}

export default Setting;