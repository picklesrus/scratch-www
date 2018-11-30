const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../components/os-chooser/os-chooser.jsx');

const ExtensionLanding = require('../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../components/extension-landing/extension-header.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const OS_ENUM = require('../../components/extension-landing/os-enum.js');

require('../../components/extension-landing/extension-landing.scss');
require('./download.scss');

class Downloads extends ExtensionLanding {

    render () {
        return (
            <div className="extension-landing download">
                <ExtensionHeader
                    imageAlt={this.props.intl.formatMessage({id: 'download.imgAltDownloadIllustration'})}
                    imageSrc="/images/download/desktop.png"
                >
                    <FlexRow className="column download-copy">
                        <h1 className="title"><img
                            alt=""
                            height="40"
                            src="/images/download/placeholder.png"
                            width="40"
                        />
                            <FormattedMessage id="download.title" />
                        </h1>
                        <FormattedMessage id="download.intro" />
                    </FlexRow>
                    <ExtensionRequirements>
                        <span>
                            <img
                                alt=""
                                src="/svgs/extensions/windows.svg"
                            />
                                        Windows 10+
                        </span>
                        <span>
                            <img
                                alt=""
                                src="svgs/extensions/mac.svg"
                            />
                                        macOS 10.13+
                        </span>
                    </ExtensionRequirements>
                </ExtensionHeader>
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <InstallScratchLink
                    currentOS={this.state.OS}
                    downloadAndInstallMsgId="download.downloadAndInstall"
                    installHeaderTitleMsgId="download.installScratchDesktop"
                    installStartMsgId="download.startScratchDesktop"
                    startScreenshotImageName="desktop-screenshot"
                />
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="download.troubleshootingTitle" /></h2>
                    <h3 className="faq-title"><FormattedMessage id="download.haveYouInstalled" /></h3>
                    <p>
                        <FormattedMessage id="download.answerInstalled" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="download.question2" /></h3>
                    <p>
                        <FormattedMessage id="download.question2" />
                    </p>
                </ExtensionSection>
                <ExtensionSection className="blue older-versions">
                    <h2><FormattedMessage id="download.olderVersions" /></h2>
                    <h3 className="faq-title"><FormattedMessage id="download.lookingForOlder" /></h3>
                    <FlexRow>
                        <div className="older-version">
                            <img
                                alt=""
                                src="/images/scratch_1.4/scratch-mac.png"
                            />
                            <p>
                                <FormattedMessage id="download.scratch14Desktop" />
                            </p>
                        </div>
                        <div className="older-version">
                            <img
                                alt=""
                                src="/images/scratch_1.4/scratch-mac.png"
                            />
                            <p>
                                <FormattedMessage id="download.scratch2Desktop" />
                            </p>
                        </div>
                    </FlexRow>
                </ExtensionSection>

            </div>
        );
    }
}

Downloads.propTypes = {
    intl: intlShape.isRequired
};

const WrappedDownloads = injectIntl(Downloads);

render(<Page><WrappedDownloads /></Page>, document.getElementById('app'));
