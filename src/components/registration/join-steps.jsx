const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const api = require('../../lib/api');

const PropTypes = require('prop-types');
const React = require('react');

/*
 * USERNAME STEP
 */
class UsernameStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeShowPassword',
            'handleUsernameBlur',
            'handleValidSubmit',
            'validateUsername'
        ]);
        this.state = {
            showPassword: props.showPassword,
            waiting: false,
            validUsername: ''
        };
    }
    handleChangeShowPassword (field, value) {
        this.setState({showPassword: value});
    }
    validateUsername (username, callback) {
        callback = callback || function () {};

        if (!username) {
            this.form.formsy.updateInputsWithError({
                'user.username': this.props.intl.formatMessage({id: 'form.validationRequired'})
            });
            return callback(false);
        }

        api({
            host: '',
            uri: `/accounts/check_username/${username}/`
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                err = err || this.props.intl.formatMessage({id: 'general.error'});
                this.form.formsy.updateInputsWithError({all: err});
                return callback(false);
            }
            body = body[0];

            switch (body.msg) {
            case 'valid username':
                this.setState({
                    validUsername: 'pass'
                });
                return callback(true);
            case 'username exists':
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameExists'
                    })
                });
                return callback(false);
            case 'bad username':
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameVulgar'
                    })
                });
                return callback(false);
            case 'invalid username':
            default:
                this.form.formsy.updateInputsWithError({
                    'user.username': this.props.intl.formatMessage({
                        id: 'registration.validationUsernameInvalid'
                    })
                });
                return callback(false);
            }
        });
    }
    handleUsernameBlur (name, value) {
        if (this.form.formsy.inputs[0].isValidValue(value)) {
            this.validateUsername(value);
        }
    }
    handleValidSubmit (formData) {
        this.setState({waiting: true});
        this.validateUsername(formData.user.username, isValid => {
            this.setState({waiting: false});
            if (isValid) return this.props.onNextStep(formData);
        });
    }
    render () {
        return (
            <Slide className="registration-step username-step">
                <h2>
                    {this.props.title ? (
                        this.props.title
                    ) : (
                        <intl.FormattedMessage id="registration.usernameStepTitle" />
                    )}
                </h2>
                <p className="description">
                    {this.props.description ? (
                        this.props.description
                    ) : (
                        <span>
                            <intl.FormattedMessage id="registration.usernameStepDescription" />
                            <b>
                                <intl.FormattedMessage id="registration.usernameStepRealName" />
                            </b>
                        </span>
                    )}
                    {this.props.tooltip ? (
                        <Tooltip
                            tipContent={this.props.tooltip}
                            title={'?'}
                        />
                    ) : (
                        null
                    )}
                </p>
                <Card>
                    <Form
                        ref={form => {
                            this.form = form;
                        }}
                        onValidSubmit={this.handleValidSubmit}
                    >
                        <div>
                            <div className="username-label">
                                <b>
                                    {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                </b>
                                {this.props.usernameHelp ? (
                                    <p className="help-text">{this.props.usernameHelp}</p>
                                ) : (
                                    null
                                )}
                            </div>
                            <Input
                                required
                                className={this.state.validUsername}
                                name="user.username"
                                type="text"
                                validationErrors={{
                                    matchRegexp: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameRegexp'
                                    }),
                                    minLength: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameMinLength'
                                    }),
                                    maxLength: this.props.intl.formatMessage({
                                        id: 'registration.validationUsernameMaxLength'
                                    })
                                }}
                                validations={{
                                    matchRegexp: /^[\w-]*$/,
                                    minLength: 3,
                                    maxLength: 20
                                }}
                                onBlur={this.handleUsernameBlur}
                            />
                        </div>
                        <Input
                            required
                            label={
                                this.props.intl.formatMessage({id: 'general.password'})
                            }
                            name="user.password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            validationErrors={{
                                minLength: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordLength'
                                }),
                                notEquals: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotEquals'
                                }),
                                notEqualsField: this.props.intl.formatMessage({
                                    id: 'registration.validationPasswordNotUsername'
                                })
                            }}
                            validations={{
                                minLength: 6,
                                notEquals: 'password',
                                notEqualsField: 'user.username'
                            }}
                        />
                        <Checkbox
                            help={null}
                            name="showPassword"
                            value={this.state.showPassword}
                            valueLabel={
                                this.props.intl.formatMessage({id: 'registration.showPassword'})
                            }
                            onChange={this.handleChangeShowPassword}
                        />
                        <GeneralError name="all" />
                        <NextStepButton
                            text={<intl.FormattedMessage id="registration.nextStep" />}
                            waiting={this.props.waiting || this.state.waiting}
                        />
                    </Form>
                </Card>
                <StepNavigation
                    active={this.props.activeStep}
                    steps={this.props.totalSteps - 1}
                />
            </Slide>
        );
    }
}

UsernameStep.propTypes = {
    activeStep: PropTypes.number,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    intl: intl.intlShape,
    onNextStep: PropTypes.func,
    showPassword: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    totalSteps: PropTypes.number,
    usernameHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    waiting: PropTypes.bool
};

UsernameStep.defaultProps = {
    showPassword: false,
    waiting: false
};

const IntlUsernameStep = injectIntl(UsernameStep);
