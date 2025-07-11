<?php

namespace App\Policies;

use App\Models\User;
use App\Models\pendaftaran_event;
use Illuminate\Auth\Access\HandlesAuthorization;

class pendaftaran_eventPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view_any_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('view_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('update_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('delete_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can bulk delete.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete_any_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can permanently delete.
     */
    public function forceDelete(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('force_delete_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can permanently bulk delete.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->can('force_delete_any_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can restore.
     */
    public function restore(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('restore_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can bulk restore.
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore_any_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can replicate.
     */
    public function replicate(User $user, pendaftaran_event $pendaftaranEvent): bool
    {
        return $user->can('replicate_pendaftaran::event::divisi');
    }

    /**
     * Determine whether the user can reorder.
     */
    public function reorder(User $user): bool
    {
        return $user->can('reorder_pendaftaran::event::divisi');
    }
}
