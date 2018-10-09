import React from 'react';
import { Modal, Button, message } from 'antd';
import {WrappedCreatePostForm} from "./CreatePostForm"
import {POS_KEY, API_ROOT, TOKEN_KEY, AUTH_PREFIX } from "../constants"
import $ from 'jquery';
export class CreatePostButton extends React.Component {
    state = {
        visible: false,
        confirmLoading: false
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.form.validateFields((err, values) => {
            if (!err) {
                const { latitude, longitude } = JSON.parse(localStorage.getItem(POS_KEY));
                console.log(`${latitude} ${longitude}`);
                console.log(values);

                const formData = new FormData();
                formData.set('latitude', latitude);
                formData.set('longitude', longitude);
                formData.set('message', values.message);
                formData.set('image', values.image[0].originFileObj);

                this.setState({confirmLoading: true});
                $.ajax({
                    url: `${API_ROOT}/post`,
                    method: 'POST',
                    data: formData,
                    header: {
                        Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
                    },
                    processData: false,
                    contentType: false,
                    dataType: 'text',
                }).then(
                    () => {
                        message.success('Created a post successfully!')
                        // clear the dragger form
                        this.form.resetFields();
                        this.setState({confirmLoading: false, visible: false});
                        this.props.loadNearbyPosts();
                    },
                    (response) => {
                        message.error(response.responseText);
                        this.setState({confirmLoading: false, visible: false});
                    }
                ).catch(
                    (error) => {console.log(error)}
                )
            }
        })
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (form) => {

        this.form = form;
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal
                    title="Create New Post"
                    confirmLoading={this.state.confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm ref={this.saveFormRef} />
                </Modal>
            </div>
        )
    }
}