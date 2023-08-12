import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = feedbackOption => {
    const setsMap = {
      good: setGood,
      neutral: setNeutral,
      bad: setBad,
    };

    setsMap[feedbackOption](prevAmount => prevAmount + 1);
  };

  const calculateTotalFeedback = () => {
    const totalFeedback = good + neutral + bad;
    return totalFeedback;
  };

  const calculatePositivePercentage = () => {
    const totalFeedback = calculateTotalFeedback();
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

  const optionsArr = ['good', 'neutral', 'bad'];
  const totalFeedback = calculateTotalFeedback();
  const positivePercentage = calculatePositivePercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={optionsArr}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {totalFeedback ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </>
  );
};
