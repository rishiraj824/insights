import React, { Component } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { BrowserView, MobileView } from 'react-device-detect';
import { Ratiobar } from '../components/ratiobar';
import './style.css';
import { getNavbar } from '../components/nav';
import { connect } from 'react-redux';
import { getApplicant } from '../store/actions/applicants';
import { signOut, signOutAuthDialog } from '../store/actions/authActions';
import { getResolvedRoleName } from '../config/jobConfig';

const dummyReport = {
  radarCharts: [
    {
      title: 'Trends',
      data: [
        { word: 'Blockchain', A: 150, fullMark: 150 },
        { word: 'Cyrpto', A: 150, fullMark: 150 },
        { word: 'IOT', A: 86, fullMark: 150 },
        { word: 'Security', A: 99, fullMark: 150 },
        { word: 'Automation', A: 85, fullMark: 150 }
      ]
    }
  ],

  ratioBarCharts: [
    {
      title: 'I vs We',
      data: [{ label: 'I/Me', percent: 10, val: 5 }, { label: 'We/Us', percent: 90, val: 45 }]
    },
    {
      title: 'Postive vs Negative',
      data: [{ label: 'Positive', percent: 40, val: 100 }, { label: 'Negative', percent: 60, val: 400 }]
    }
  ],
  textCharts: [
    {
      title: 'Words similar to Team',
      data: '7232 Mentions'
    },
    {
      title: 'Questions Asked',
      data: '7 Questions'
    },
    {
      title: 'Words similar to Innovation',
      data: '23 Mentions'
    }
  ]
};

const dummyUser = {
  name: 'John Paul',
  experience: 2,
  age: 25,
  role: 'UI Lead'
};

export class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getApplicant } = this.props;
    getApplicant(this.props.match.params.id);
  }
  render() {
    const { applicant, auth, signOut, signOutAuthDialog, showDialog } = this.props;
    return (
      <div>
        {getNavbar(auth, signOut, signOutAuthDialog, showDialog)}
        <div className={'report-container'}>
          {applicant.name && (
            <div className={'profile'}>
              <h3> {applicant.name} </h3>
              <p> {getResolvedRoleName(applicant.role)}</p>
              <p> {applicant.experience} year experience</p>
            </div>
          )}
          {applicant.report && (
            <div className={'chart-container'}>
              {applicant.report &&
                applicant.report.radarCharts.map((radarChart, key) => (
                  <div className={'card tall'} key={key}>
                    <MobileView>
                      <RadarChart cx={180} cy={180} outerRadius={100} width={350} height={350} data={radarChart.data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='word' />
                        <Radar name='Mike' dataKey='A' stroke='#55e0ab' fill='#55e0ab' fillOpacity={0.6} />
                      </RadarChart>
                    </MobileView>
                    <BrowserView>
                      <RadarChart cx={300} cy={200} outerRadius={150} width={600} height={400} data={radarChart.data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey='word' />
                        <Radar name='Mike' dataKey='A' stroke='#55e0ab' fill='#55e0ab' fillOpacity={0.6} />
                      </RadarChart>
                    </BrowserView>
                  </div>
                ))}

              {applicant.report.ratioBarCharts &&
                applicant.report.ratioBarCharts.map((ratioBarChart, index) => (
                  <div className={'card'} key={index}>
                    <div className={'title'}>{ratioBarChart.title} </div>
                    <div className={'divide'} />
                    <Ratiobar data={ratioBarChart.data} />
                    <br />
                  </div>
                ))}

              {applicant.report.textCharts &&
                applicant.report.textCharts.map((textChart, index) => (
                  <div className={'card'} key={index}>
                    <div className={'title'}>{textChart.title} </div>
                    <div className={'divide'} />
                    <div className={'big-text'}> {textChart.data}</div>
                    <br />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    applicant: state.applicant,
    showDialog: state.auth.showDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicant: payload => dispatch(getApplicant(payload)),
    signOut: () => dispatch(signOut()),
    signOutAuthDialog: () => dispatch(signOutAuthDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
