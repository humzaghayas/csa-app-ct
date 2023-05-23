import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import {
    useDataTableSortingState,
    usePaginationState,
} from '@commercetools-uikit/hooks';
import { useEffect, useState } from 'react';
import Text from '@commercetools-uikit/text';
import React from "react";
import questions from './Troubleshoots.json';
import { CustomFormMainPage, InfoDetailPage } from '@commercetools-frontend/application-components';
import { CollapsiblePanel, Constraints } from '@commercetools-frontend/ui-kit';
import styles from './styles.css';
//import { questions } from './troub';
//import questions from './troub';


const Troubleshoot = (props) => {


    // const { page, perPage } = usePaginationState();
    // const { push } = useHistory();
    const QuestionContext = React.createContext();

    useEffect(async () => {

    }, []);

    function Banner({ children, ...restProps }) {
        return (
            < div className={styles.Container}  {...restProps}>
                <div className={styles.Inner}>{children}</div>
            </div>
        );
    };

    Banner.Entity = function BannerEntity({ children, ...restProps }) {
        const [open, setOpen] = useState(false);
        return (
            <QuestionContext.Provider value={{ open, setOpen }}>
                <div className={styles.Entity}  {...restProps}> {children}</div>
            </QuestionContext.Provider>
        );
    };
    Banner.Question = function BannerHeader({ children, ...restProps }) {
        const { open, setOpen } = React.useContext(QuestionContext);

        return (
            <div className={styles.Question} onClick={() => setOpen((open) => !open)} {...restProps}>
                {children}

                {open ? <h3>^</h3> : <h3>+</h3>}
            </div>
        );
    };
    Banner.Textt = function BannerText({ children, ...restProps }) {
        const { open } = React.useContext(QuestionContext);
        return open ? <div className={styles.Textt}  {...restProps}>{children}</div> : null;
    };
    console.log(Banner);

    return (
        <Spacings.Stack scale="xl">
            <Spacings.Stack scale="xs">
                <Text.Headline as="h1"  >Troubleshoots</Text.Headline>

                <Spacings.Stack>
                    <Banner>
                        {questions.map((question) => (
                            <Banner.Entity key={question.id}>
                                <Banner.Question>{question.question}</Banner.Question>
                                <Banner.Textt>
                                    {question.answer.split('\n').map((step, index) => (
                                        <p key={index}>{step}</p>
                                    ))}
                                </Banner.Textt>
                                <br></br>
                            </Banner.Entity>
                        ))}
                    </Banner>


                </Spacings.Stack>
            </Spacings.Stack>



        </Spacings.Stack>
    );
};
Troubleshoot.displayName = 'Troubleshoot';
Troubleshoot.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};

export default Troubleshoot;
