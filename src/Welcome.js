import React, { createRef } from 'react'
import {
    Container
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Menu from './components/Menu';

const styles = {
   title: {
    color: '#EEEEEE',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 44,
    letterSpacing: 0.02,
   }
};
  
export default function Main(props) {
    const contextRef = createRef()
    return (
        <div ref={contextRef}>
            <Container style={{backgroundColor:'#11111E'}}>
                <Menu/>
            </Container>
        </div>
    )
}

{/* <Grid>
<Grid.Row columns={1}>
        <Grid.Column textAlign='center'>
            <p style={styles.title}>
                {/* Welcome */}
            // </p>
        // </Grid.Column>
// </Grid.Row>
{/* <Grid.Row> */}
    // <Grid.Column textAlign={'center'}>
        {/* <Menu/> */}
    // </Grid.Column>
// </Grid.Row> */}
{/* <Grid.Row>
    <Grid.Column textAlign={'center'}>
        <Button color="red">Create A Competition</Button>    
    </Grid.Column>
</Grid.Row> */}
{/* </Grid> */}
