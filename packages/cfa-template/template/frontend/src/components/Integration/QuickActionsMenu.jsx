import React, { useState } from 'react';
import { EllipsisVertical, Unplug, Zap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UserActionModal } from './modals';
import { useIntegrationContext } from '../../context/IntegrationContext.jsx';
import { useNavigate } from 'react-router-dom';

function QuickActionsMenu({
  disconnectIntegration,
  userActions,
  integrationConfiguration,
}) {
  const [isUserActionModalOpen, setIsUserActionModalOpen] = useState(false);
  const [userActionDetails, setUserActionDetails] = useState({});
  const { integrationId, setUserAction } = useIntegrationContext();
  const navigate = useNavigate();

  const dropDownDisconnect = async () => {
    await disconnectIntegration();
  };

  function closeUserActionModal() {
    setIsUserActionModalOpen(false);
  }

  async function handleMenuItemClick(userAction) {
    if (userAction.action === 'SAMPLE_DATA') {
      await getSampleData();
      return;
    }

    openUserActionModal(userAction);
  }

  const getSampleData = async () => {
    navigate(`/data/${integrationId}`);
  };

  function openUserActionModal(userAction) {
    setIsUserActionModalOpen(true);
    setUserActionDetails({
      action: userAction.action,
      title: userAction.title,
      description: userAction.description,
    });
    setUserAction(userAction.action);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="flex">
              <Zap className="mr-2 h-4 w-4" /> <span>Quick Actions</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userActions.map((userAction) => {
            return (
              <DropdownMenuItem
                key={userAction.title}
                onClick={() => handleMenuItemClick(userAction)}
              >
                {userAction.title}
              </DropdownMenuItem>
            );
          })}
          {integrationConfiguration && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={integrationConfiguration}>
                Configure Integration
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={dropDownDisconnect}
            className="text-destructive focus:text-destructive"
          >
            <Unplug className="mr-2 h-4 w-4" />
            <p>Disconnect</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUserActionModalOpen ? (
        <UserActionModal
          closeConfigModal={closeUserActionModal}
          integrationId={integrationId}
          userActionDetails={userActionDetails}
        ></UserActionModal>
      ) : null}
    </>
  );
}

export default QuickActionsMenu;
