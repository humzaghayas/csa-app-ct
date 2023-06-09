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
import questions from "./Faq.json";
//import { Container } from '@mui/material';
//import Banner from "./banner";
//import { Container, Header, Entity, Inner, Question, Textt } from './styles';
import styles from './styles.css';
import { CustomFormMainPage, InfoDetailPage } from '@commercetools-frontend/application-components';
import { CollapsiblePanel, Constraints } from '@commercetools-frontend/ui-kit';




const FaqList = (props) => {


    const { page, perPage } = usePaginationState();
    const { push } = useHistory();
    const QuestionContext = React.createContext();

    useEffect(async () => {

    }, []);

    function Banner({ children, ...restProps }) {
        return (
            // // <div className={styles.Container}>
            // <CollapsiblePanel {...restProps}>
            //     {/* <div className={styles.Inner}> */}
            //     <Constraints.Horizontal>{children}</Constraints.Horizontal>
            //     {/* </div> */}
            // </CollapsiblePanel>
            // // </div>
            < div className={styles.Container}  {...restProps}>
                <div className={styles.Inner}>{children}</div>
            </div>
        );
    };

    // Banner.Header = function BannerHeader({ children, ...restProps }) {
    //     return <div className={styles.Header} {...restProps}> {children}</div>;
    // };

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
                <div className={styles.header}>
                    <Text.Headline as="h2"  >Frequently Asked Questions</Text.Headline>
                </div>
            </Spacings.Stack>

            <Spacings.Stack scale="l">
                <Banner>

                    {/* <Banner.Header>Frequently Asked Questions</Banner.Header> */}
                    {questions.map((question) => (
                        <Banner.Entity key={question.id}>
                            <Banner.Question>{question.question}</Banner.Question>
                            {/* <div></div> */}
                            <Banner.Textt>{question.answer}</Banner.Textt>
                            <br></br>
                        </Banner.Entity>

                    ))}
                    <br></br>
                    <h3>
                        Question not on the list? Contact out help desk for further enquiries
                    </h3>
                </Banner>

            </Spacings.Stack>

        </Spacings.Stack>
    );
};
FaqList.displayName = 'FaqList';
FaqList.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};

export default FaqList;
