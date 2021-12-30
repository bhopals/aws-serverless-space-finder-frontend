import { Component } from "react";
import { DataService } from "../../services/DataService";
import { Space } from "./../../model/Model";
import { SpaceComponent } from "./SpaceComponent";
import { ConfirmModalComponent } from "./ConfirmModalComponent";
import { Link } from "react-router-dom";
interface SpacesProps {
  dataService: DataService;
}

interface SpaceState {
  spaces: Space[];
  showModal: boolean;
  modalContent: string;
}

export class Spaces extends Component<SpacesProps, SpaceState> {
  constructor(props: SpacesProps) {
    super(props);
    this.state = {
      spaces: [],
      showModal: false,
      modalContent: "",
    };
    this.closeModal = this.closeModal.bind(this);
    this.reserveSpace = this.reserveSpace.bind(this);
  }

  async componentDidMount() {
    const spaces = await this.props.dataService.getSpaces();
    this.setState({ spaces: spaces });
  }

  private async reserveSpace(spaceId: string) {
    const reservationResult = await this.props.dataService.reserveSpace(
      spaceId
    );
    if (reservationResult) {
      this.setState({
        showModal: true,
        modalContent: `You reserved space with id ${spaceId} and got the reservation number ${reservationResult}`,
      });
    } else {
      this.setState({
        showModal: true,
        modalContent: `You cannot reserve the space with id ${spaceId}`,
      });
    }
  }

  private renderSpaces() {
    const rows: any[] = [];
    for (const space of this.state.spaces) {
      rows.push(
        <SpaceComponent
          key={space.spaceId}
          location={space.location}
          name={space.name}
          spaceId={space.spaceId}
          reserveSpace={() => this.reserveSpace(space.spaceId)}
        />
      );
    }
    return rows;
  }

  private closeModal() {
    this.setState({ showModal: false, modalContent: "" });
  }
  public render() {
    return (
      <div>
        <h2>Welcome to the Spaces Pages</h2>
        <Link to="/createSpace">Create Space</Link> <br />
        {this.renderSpaces()}
        <ConfirmModalComponent
          close={this.closeModal}
          content={this.state.modalContent}
          show={this.state.showModal}
        />
      </div>
    );
  }
}
